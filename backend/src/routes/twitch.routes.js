import { Router } from 'express';
import fetch from 'node-fetch';
import { getTwitchAccessToken, CLIENT_ID, formatTwitchThumbnail } from '../services/twitch.service.js';

const router = Router();

function parseDuration(duration) {
  if (!duration) return null;
  const match = duration.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  const hours = parseInt(match?.[1] || 0);
  const minutes = parseInt(match?.[2] || 0);
  const seconds = parseInt(match?.[3] || 0);
  return { hours, minutes, seconds, totalSeconds: hours * 3600 + minutes * 60 + seconds };
}

function formatDuration(parsed) {
  if (!parsed) return null;
  const { hours, minutes, seconds } = parsed;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function timeAgo(dateString) {
  if (!dateString) return null;
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000), hours = Math.floor(mins / 60), days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

function formatNumber(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num?.toString() || '0';
}

// LIVE STATUS
router.get('/live/:username', async (req, res) => {
  try {
    const token = await getTwitchAccessToken();
    const username = req.params.username?.toLowerCase();
    const headers = { 'Client-ID': CLIENT_ID, Authorization: `Bearer ${token}` };

    // User
    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, { headers });
    const userData = await userRes.json();
    const user = userData.data?.[0];
    if (!user) return res.json({ status: 'offline', live: false, stream: null, lastStream: null, channel: null, pastStreams: [] });

    // Stream
    const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, { headers });
    let streamData = await streamRes.json();
    let stream = streamData.data?.[0] || null;
    const isLive = stream?.type === 'live';
    if (stream?.thumbnail_url) stream.thumbnail_url = formatTwitchThumbnail(stream.thumbnail_url, 1280, 720);

    // Channel
    const channelRes = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${user.id}`, { headers });
    const channelData = await channelRes.json();
    const channelInfo = channelData.data?.[0] || {};

    // Followers
    const followerRes = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${user.id}`, { headers });
    const followerData = await followerRes.json();
    const followerCount = followerData.total || 0;

    // vods (past streams)
    const vodRes = await fetch(`https://api.twitch.tv/helix/videos?user_id=${user.id}&type=archive&first=5`, { headers });
    const vodData = await vodRes.json();
    let pastStreams = (vodData.data || []).map(v => {
      const parsed = parseDuration(v.duration);
      const start = new Date(v.created_at);
      const end = parsed ? new Date(start.getTime() + parsed.totalSeconds * 1000) : null;
      return {
        id: v.id,
        title: v.title,
        url: v.url,
        view_count: v.view_count,
        thumbnail_url: formatTwitchThumbnail(v.thumbnail_url, 1280, 720),
        created_at: v.created_at,
        ended_at: end ? end.toISOString() : null,
        duration_readable: formatDuration(parsed),
        time_ago: timeAgo(v.created_at),
      };
    });
    pastStreams.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const latestStream = pastStreams[0] || null;

    // Response
    res.json({
      status: isLive ? 'live' : 'offline',
      live: isLive,
      stream: isLive ? { ...stream, viewer_count_readable: formatNumber(stream.viewer_count) } : null,
      lastStream: !isLive && latestStream ? latestStream : null,
      channel: {
        id: user.id,
        login: user.login,
        display_name: user.display_name,
        profile_image_url: user.profile_image_url,
        offline_image_url: user.offline_image_url,
        current_game: channelInfo?.game_name || null,
        current_title: channelInfo?.title || null,
        followerCount,
        followerCount_readable: formatNumber(followerCount),
      },
      pastStreams,
    });

  } catch (err) {
    console.error('Twitch API error:', err.message);
    res.json({ status: 'offline', live: false, stream: null, lastStream: null, channel: null, pastStreams: [] });
  }
});

export default router;