import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const chatController = {
  getMessages: async (req: Request, res: Response) => {
    try {
      const { id: requestId } = req.params;
      const { data, error } = await supabase
        .from('chats')
        .select('*, users:sender_id(name, avatar_url)')
        .eq('request_id', requestId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  sendMessage: async (req: any, res: Response) => {
    try {
      const { request_id } = req.params;
      const { message } = req.body;
      const senderId = req.user.id;

      const { data, error } = await supabase
        .from('chats')
        .insert([{ request_id, sender_id: senderId, message }])
        .select('*, users:sender_id(name, avatar_url)')
        .single();

      if (error) throw error;
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
