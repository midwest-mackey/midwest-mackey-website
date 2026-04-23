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

app.use('/twitch', twitchRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/fortnite', fortniteRoutes);
app.use('/images', express.static(path.join(__dirname, '../public/images')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('📁 Static images path:', path.join(__dirname, '../public/images'));
  console.log(`✅ Backend API running on port ${PORT}`);
});