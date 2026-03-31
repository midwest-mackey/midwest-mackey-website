import { Router } from 'express';
import fetch from 'node-fetch';
import { getTwitchAccessToken, CLIENT_ID, formatTwitchThumbnail } from '../services/twitch.service.js';

const router = Router();

router.get('/live/:username', async (req, res) => {
  try {
    const token = await getTwitchAccessToken();
    const username = req.params.username?.toLowerCase();

    // Get user info
    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: { 'Client-ID': CLIENT_ID, Authorization: `Bearer ${token}` },
    });
    const userData = await userRes.json();
    if (userData.error) return res.json({ live: false, error: userData.message, stream: null, pastStreams: [] });

    const user = userData.data?.[0];
    if (!user) return res.json({ live: false, error: 'User not found', stream: null, pastStreams: [] });

    // Check if live
    const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, {
      headers: { 'Client-ID': CLIENT_ID, Authorization: `Bearer ${token}` },
    });
    const streamData = await streamRes.json();
    const stream = streamData.data?.[0] || null;
    const isLive = stream?.type === 'live';

    // Normalize LIVE thumbnail if present
    if (stream?.thumbnail_url) {
      stream.thumbnail_url = formatTwitchThumbnail(stream.thumbnail_url, 640, 360);
    }

    // Fetch recent VODs for past streams
    const vodRes = await fetch(
      `https://api.twitch.tv/helix/videos?user_id=${user.id}&type=archive&first=5`,
      {
        headers: { 'Client-ID': CLIENT_ID, Authorization: `Bearer ${token}` },
      }
    );
    const vodData = await vodRes.json();

    // Normalize VOD thumbnails
    const pastStreams = (vodData.data || []).map(v => ({
      id: v.id,
      title: v.title,
      url: v.url,
      view_count: v.view_count,
      thumbnail_url: formatTwitchThumbnail(v.thumbnail_url, 640, 360),
    }));

    // Return response
    res.json({
      live: isLive,
      stream: isLive ? stream : null,
      pastStreams,
    });
  } catch (err) {
    console.error('Twitch API error for user', req.params.username, ':', err.message);
    res.json({ live: false, error: err.message || 'Unknown error', stream: null, pastStreams: [] });
  }
});

export default router;