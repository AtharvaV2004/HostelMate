import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { notificationsController } from './notificationsController.js';

export const requestsController = {
  // Create item request on a trip
  createRequest: async (req: any, res: Response) => {
    try {
      const { id: tripId } = req.params;
      const { item_name, quantity, max_budget, photo_url, urgency, is_urgent } = req.body;
      const requesterId = req.user.id;

      // 1. Check if trip exists and is active
      const { data: trip, error: tripError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single();

      if (tripError || !trip) return res.status(404).json({ success: false, message: 'Trip not found' });
      if (trip.status !== 'active') return res.status(409).json({ success: false, message: 'Trip is no longer active' });
      if (trip.user_id === requesterId) return res.status(403).json({ success: false, message: 'Cannot request on your own trip' });

      // 2. Check for duplicate request
      const { data: existing } = await supabase
        .from('requests')
        .select('id')
        .eq('trip_id', tripId)
        .eq('requester_id', requesterId)
        .single();

      if (existing) return res.status(409).json({ success: false, message: 'Duplicate request' });

      // 3. Create request
      const { data, error } = await supabase
        .from('requests')
        .insert([{
          trip_id: tripId,
          requester_id: requesterId,
          item_name,
          quantity,
          max_budget,
          photo_url,
          urgency,
          is_urgent: is_urgent || false
        }])
        .select()
        .single();

      if (error) throw error;

      // Send push notification to the trip creator
      await notificationsController.sendNotificationToUser(trip.user_id, {
        title: 'New Request!',
        body: `Someone requested ${item_name} on your trip to ${trip.destination}`
      });

      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update request status (accept/reject/complete)
  updateRequest: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;

      // Fetch request and trip info
      const { data: request, error: reqError } = await supabase
        .from('requests')
        .select('*, trips(user_id)')
        .eq('id', id)
        .single();

      if (reqError || !request) return res.status(404).json({ success: false, message: 'Request not found' });

      const isOwner = request.trips.user_id === userId;
      const isRequester = request.requester_id === userId;

      if (!isOwner && !isRequester) return res.status(403).json({ success: false, message: 'Forbidden' });

      const { data, error } = await supabase
        .from('requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Send push notification about status change
      const notificationRecipient = isOwner ? request.requester_id : request.trips.user_id;
      await notificationsController.sendNotificationToUser(notificationRecipient, {
        title: 'Request Update',
        body: `Request status changed to ${status}`
      });

      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get single request details
  getRequestById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('requests')
        .select('*, trips(*, users(*)), users:requester_id(*)')
        .eq('id', id)
        .single();

      if (error) return res.status(404).json({ success: false, message: 'Request not found' });

      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Generate QR for delivery
  generateQR: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const { data: request } = await supabase.from('requests').select('requester_id').eq('id', id).single();
      if (!request || request.requester_id !== userId) {
        return res.status(403).json({ success: false, message: 'Only requester can generate QR' });
      }

      const qrToken = Math.random().toString(36).substring(2, 15);
      const { error } = await supabase.from('requests').update({ qr_token: qrToken }).eq('id', id);

      if (error) throw error;

      res.json({ success: true, data: { qrToken } });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Verify QR
  verifyQR: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { qrToken } = req.body;
      const userId = req.user.id;

      const { data: request } = await supabase
        .from('requests')
        .select('*, trips(user_id)')
        .eq('id', id)
        .single();

      if (!request || request.trips.user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Only trip owner can verify QR' });
      }

      if (request.qr_token !== qrToken) {
        return res.status(400).json({ success: false, message: 'Invalid QR token' });
      }

      const { error } = await supabase
        .from('requests')
        .update({ status: 'completed', qr_token: null })
        .eq('id', id);

      if (error) throw error;

      res.json({ success: true, message: 'Delivery confirmed' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
