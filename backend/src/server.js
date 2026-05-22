import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db/database.js';

import twitchRoutes from './routes/twitch.routes.js';
import spotifyRoutes from './routes/spotify.routes.js';
import fortniteRoutes from './routes/fortnite.routes.js';
import ordersRoutes from './routes/orders.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

let isReady = false;

// Routes
app.use('/twitch', twitchRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/fortnite', fortniteRoutes);
app.use('/orders', ordersRoutes);

// Static
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Health check (Dockpeek uses this)
app.get('/health', (req, res) => {
  if (!isReady) {
    return res.status(503).json({ status: 'starting' });
  }

  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // 1. Initialize DB first
    await initDb();

    // 2. Start server only AFTER DB is ready
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Backend API running on port ${PORT}`);
      console.log(`📁 Static images path ready`);

      isReady = true;
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();