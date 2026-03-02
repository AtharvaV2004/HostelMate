import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Clerk middleware to protect routes
export const requireAuth = ClerkExpressRequireAuth();
