import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import twitchRoutes from './routes/twitch.routes.js';
import spotifyRoutes from './routes/spotify.routes.js';
import fortniteRoutes from './routes/fortnite.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

let isReady = false;

// Routes
app.use('/twitch', twitchRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/fortnite', fortniteRoutes);

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend API running on port ${PORT}`);
  console.log(`📁 Static images path ready`);

  isReady = true;
});