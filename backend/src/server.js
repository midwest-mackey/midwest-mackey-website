import express from 'express';
import cors from 'cors';
import twitchRoutes from './routes/twitch.routes.js';
import spotifyRoutes from './routes/spotify.routes.js';

const app = express();
app.use(cors());

app.use('/twitch', twitchRoutes);
app.use('/spotify', spotifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running on port ${PORT}`);
});