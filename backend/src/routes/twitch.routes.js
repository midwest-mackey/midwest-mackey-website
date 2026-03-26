// twitch.routes.js
import { Router } from 'express';
import fetch from 'node-fetch';
import { getTwitchAccessToken, CLIENT_ID } from '../services/twitch.service.js'; // <-- import CLIENT_ID from secrets

const router = Router();

router.get('/live/:username', async (req, res) => {
  try {
    const token = await getTwitchAccessToken(); // fetch valid access token
    const username = req.params.username?.toLowerCase();

    // Get user info
    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: { 'Client-ID': CLIENT_ID, Authorization: `Bearer ${token}` }, // <-- use Docker secret
    });
    const userData = await userRes.json();
    const user = userData.data?.[0];
    if (!user) return res.json({ live: false, error: 'User not found' });

    // Check if live
    const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, {
      headers: { 'Client-ID': CLIENT_ID, Authorization: `Bearer ${token}` }, // <-- Docker secret
    });
    const streamData = await streamRes.json();
    const stream = streamData.data?.[0] || null;
    const isLive = stream?.type === 'live';

    // If not live, fetch recent VODs
    if (!isLive) {
      const vodRes = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=${user.id}&type=archive&first=5`,
        {
          headers: { 'Client-ID': CLIENT_ID, Authorization: `Bearer ${token}` }, // <-- Docker secret
        }
      );
      const vodData = await vodRes.json();
      return res.json({ live: false, stream: null, pastStreams: vodData.data || [] });
    }

    // Stream is live
    res.json({ live: true, stream });
  } catch (err) {
    console.error('Twitch API error:', err);
    res.json({ live: false, error: err.message || 'Unknown error' });
  }
});

export default router;