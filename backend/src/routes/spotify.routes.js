import { Router } from 'express';
import { getSpotifyNowPlaying } from '../services/spotify.service.js';

const router = Router();

// Current playing track
router.get('/now-playing', async (req, res) => {
  try {
    const track = await getSpotifyNowPlaying();
    res.json(track);
  } catch (err) {
    console.error('Spotify error:', err);
    res.status(500).json({ playing: false });
  }
});

// Recently played tracks
router.get('/recently-played', async (req, res) => {
  try {
    const recentTracks = await getSpotifyHistory();
    res.json(recentTracks);
  } catch (err) {
    console.error('Spotify history error:', err);
    res.status(500).json({ error: 'Failed to fetch recently played tracks' });
  }
});

// OAuth redirect callback
router.get('/callback', (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code returned by Spotify');

  console.log('Spotify auth code:', code);
  res.send('Spotify auth code received. Check server logs.');
});

export default router;