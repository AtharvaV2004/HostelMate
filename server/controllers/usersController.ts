import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const usersController = {
  getProfile: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Get basic info
      const { data: user, error } = await supabase.from('users').select('*').eq('id', id).single();
      if (error || !user) return res.status(404).json({ success: false, message: 'User not found' });

      // Get stats
      const { count: tripsCount } = await supabase.from('trips').select('*', { count: 'exact', head: true }).eq('user_id', id);
      const { count: requestsCount } = await supabase.from('requests').select('*', { count: 'exact', head: true }).eq('requester_id', id);
      
      const { data: ratings } = await supabase.from('ratings').select('rating').eq('to_user_id', id);
      const avgRating = ratings && ratings.length > 0 
        ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length 
        : 0;

      res.json({
        success: true,
        data: {
          ...user,
          stats: {
            trips_as_shopper: tripsCount,
            requests_as_requester: requestsCount,
            avg_rating: avgRating,
            total_ratings: ratings?.length || 0
          }
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getMe: async (req: any, res: Response) => {
    res.json({ success: true, data: req.user });
  }
};
