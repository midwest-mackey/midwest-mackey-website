import { Router } from 'express';
import fetch from 'node-fetch';
import { getTwitchAccessToken } from '../services/twitch.service.js';

const router = Router();

router.get('/live/:username', async (req, res) => {
  try {
    const token = await getTwitchAccessToken();
    const username = req.params.username?.toLowerCase();

    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: { 'Client-ID': process.env.TWITCH_CLIENT_ID || '', Authorization: `Bearer ${token}` },
    });
    const userData = await userRes.json();
    const user = userData.data?.[0];
    if (!user) return res.json({ live: false, error: 'User not found' });

    const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, {
      headers: { 'Client-ID': process.env.TWITCH_CLIENT_ID || '', Authorization: `Bearer ${token}` },
    });
    const streamData = await streamRes.json();
    const stream = streamData.data?.[0] || null;
    const isLive = stream?.type === 'live';

    if (!isLive) {
      const vodRes = await fetch(`https://api.twitch.tv/helix/videos?user_id=${user.id}&type=archive&first=5`, {
        headers: { 'Client-ID': process.env.TWITCH_CLIENT_ID || '', Authorization: `Bearer ${token}` },
      });
      const vodData = await vodRes.json();
      return res.json({ live: false, stream: null, pastStreams: vodData.data || [] });
    }

    res.json({ live: true, stream });
  } catch (err) {
    console.error(err);
    res.json({ live: false, error: err.message || 'Unknown error' });
  }
});

export default router;