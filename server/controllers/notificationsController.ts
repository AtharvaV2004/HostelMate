import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import webpush from 'web-push';
import dotenv from 'dotenv';
dotenv.config();

webpush.setVapidDetails(
    'mailto:support@hostelmate.local',
    process.env.VITE_VAPID_PUBLIC_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

export const notificationsController = {
    subscribe: async (req: any, res: Response) => {
        try {
            const subscription = req.body;
            const userId = req.user.id; // Clerk synced ID

            if (!subscription || !subscription.endpoint) {
                return res.status(400).json({ success: false, message: 'Invalid subscription object' });
            }

            const { keys } = subscription;

            const { data, error } = await supabase
                .from('push_subscriptions')
                .insert([{
                    user_id: userId,
                    endpoint: subscription.endpoint,
                    auth_key: keys.auth,
                    p256dh_key: keys.p256dh
                }])
                .select()
                .single();

            if (error) {
                // if unique constraint or already exists handled implicitly or throws
                console.error('Subscription error:', error);
            }

            res.status(201).json({ success: true, message: 'Subscribed' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Helper function to send notification (used internally by other controllers ideally)
    sendNotificationToUser: async (userId: string, payload: any) => {
        const { data: subs } = await supabase.from('push_subscriptions').select('*').eq('user_id', userId);
        if (!subs || subs.length === 0) return;

        for (const sub of subs) {
            const pushSubscription = {
                endpoint: sub.endpoint,
                keys: {
                    auth: sub.auth_key,
                    p256dh: sub.p256dh_key
                }
            };

            try {
                await webpush.sendNotification(pushSubscription, JSON.stringify(payload));
            } catch (err: any) {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    // Unsubscribed or invalid endpoint
                    await supabase.from('push_subscriptions').delete().eq('id', sub.id);
                } else {
                    console.error("Failed to send push notification", err);
                }
            }
        }
    }
};
