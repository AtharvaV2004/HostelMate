import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { syncUser } from './server/middleware/syncUser.js';
import { errorHandler } from './server/middleware/errorHandler.js';

// Routes
import tripRoutes from './server/routes/trips.js';
import requestRoutes from './server/routes/requests.js';
import chatRoutes from './server/routes/chat.js';
import ratingRoutes from './server/routes/ratings.js';
import userRoutes from './server/routes/users.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
  }));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(ClerkExpressWithAuth());
  app.use(syncUser);

  // API Routes
  app.use('/api/trips', tripRoutes);
  app.use('/api/requests', requestRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/ratings', ratingRoutes);
  app.use('/api/users', userRoutes);

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  // Error Handler
  app.use(errorHandler);

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 HostelMate Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
