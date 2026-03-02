import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { supabase } from '../config/supabase.js';

/**
 * Middleware to sync Clerk user with Supabase users table.
 * Runs on every authenticated request.
 */
export const syncUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const auth = req.auth;
    if (!auth || !auth.userId) return next();

    // 1. Check if user exists in Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', auth.userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
      console.error('Supabase user fetch error:', error);
      return next();
    }

    if (!user) {
      // 2. Fetch user details from Clerk if not in Supabase
      const clerkUser = await clerkClient.users.getUser(auth.userId);
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username;
      const avatar_url = clerkUser.imageUrl;

      // 3. Create user in Supabase
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([
          {
            clerk_id: auth.userId,
            email,
            name,
            avatar_url
          }
        ])
        .select()
        .single();

      if (createError) {
        console.error('Supabase user creation error:', createError);
      } else {
        req.user = newUser;
      }
    } else {
      req.user = user;
    }

    next();
  } catch (err) {
    console.error('Sync user middleware error:', err);
    next();
  }
};
