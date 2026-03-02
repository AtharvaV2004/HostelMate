import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const ratingsController = {
  submitRating: async (req: any, res: Response) => {
    try {
      const { to_user_id, trip_id, rating, comment } = req.body;
      const fromUserId = req.user.id;

      // Check if already rated
      const { data: existing } = await supabase
        .from('ratings')
        .select('id')
        .eq('from_user_id', fromUserId)
        .eq('to_user_id', to_user_id)
        .eq('trip_id', trip_id)
        .single();

      if (existing) return res.status(409).json({ success: false, message: 'Rating already submitted' });

      const { data, error } = await supabase
        .from('ratings')
        .insert([{ from_user_id: fromUserId, to_user_id, trip_id, rating, comment }])
        .select()
        .single();

      if (error) throw error;
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
