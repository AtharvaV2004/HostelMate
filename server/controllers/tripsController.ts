import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const tripsController = {
  // List all active trips
  getTrips: async (req: Request, res: Response) => {
    try {
      const { destination, urgency, limit = 10, offset = 0 } = req.query;

      let query = supabase
        .from('trips')
        .select('*, users(name, avatar_url)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .range(Number(offset), Number(offset) + Number(limit) - 1);

      if (destination) {
        query = query.ilike('destination', `%${destination}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create a new trip
  createTrip: async (req: any, res: Response) => {
    try {
      const { destination, eta } = req.body;
      const userId = req.user.id;

      const { data, error } = await supabase
        .from('trips')
        .insert([{ user_id: userId, destination, eta }])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get single trip details with requests
  getTripById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { data: trip, error: tripError } = await supabase
        .from('trips')
        .select('*, users(name, avatar_url)')
        .eq('id', id)
        .single();

      if (tripError) return res.status(404).json({ success: false, message: 'Trip not found' });

      const { data: requests, error: reqError } = await supabase
        .from('requests')
        .select('*, users:requester_id(name, avatar_url)')
        .eq('trip_id', id);

      res.json({ success: true, data: { ...trip, requests } });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update trip status
  updateTrip: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;

      // Check ownership
      const { data: trip } = await supabase.from('trips').select('user_id').eq('id', id).single();
      if (!trip || trip.user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const { data, error } = await supabase
        .from('trips')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete a trip
  deleteTrip: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const { data: trip } = await supabase.from('trips').select('user_id').eq('id', id).single();
      if (!trip || trip.user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const { error } = await supabase.from('trips').delete().eq('id', id);

      if (error) throw error;

      res.json({ success: true, message: 'Trip deleted' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
