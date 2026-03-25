import { Router } from 'express';
import { getSpotifyNowPlaying } from '../services/spotify.service.js';

const router = Router();

router.get('/now-playing', async (req, res) => {
  try {
    const track = await getSpotifyNowPlaying();
    res.json(track);
  } catch (err) {
    console.error('Spotify error:', err);
    res.status(500).json({ playing: false });
  }
});
// Callback endpoint for Spotify OAuth
router.get('/callback', (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code returned by Spotify');

  // You can just log the code or exchange for refresh token manually
  console.log('Spotify auth code:', code);
  res.send('Spotify auth code received. Check server logs.');
});

export default router;