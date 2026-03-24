// backend/src/index.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());

let CLIENT_ID = '';
let CLIENT_SECRET = '';

try {
  CLIENT_ID = fs.readFileSync('/run/secrets/twitch_client_id', 'utf-8').trim();
  CLIENT_SECRET = fs.readFileSync('/run/secrets/twitch_client_secret', 'utf-8').trim();
  console.log('Twitch secrets loaded');
} catch (err) {
  console.warn('Twitch secrets not found. Backend will still run but Twitch API will fail.', err);
}

let accessToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Twitch CLIENT_ID or CLIENT_SECRET missing');
  }

  const now = Date.now();
  if (accessToken && now < tokenExpiry) return accessToken;

  try {
    const res = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    const data = await res.json();
    if (!data.access_token) throw new Error('Failed to get access token: ' + JSON.stringify(data));

    accessToken = data.access_token;
    tokenExpiry = now + (data.expires_in * 1000) - 60000;
    console.log('New Twitch token fetched, expires in', data.expires_in, 'seconds');
    return accessToken;
  } catch (err) {
    console.error('Error fetching Twitch token:', err);
    throw err;
  }
}

app.get('/twitch/live/:username', async (req, res) => {
  try {
    const token = await getAccessToken();
    const username = req.params.username?.toLowerCase();

    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = await userRes.json();
    const user = userData.data?.[0];
    if (!user) return res.json({ live: false, error: 'User not found' });

    const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, {
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    const streamData = await streamRes.json();

    const stream = streamData.data?.[0] || null;
    const isLive = stream?.type === 'live';

    if (!isLive) {
      // fetch last 5 past streams (VODs)
      const vodRes = await fetch(`https://api.twitch.tv/helix/videos?user_id=${user.id}&type=archive&first=5`, {
        headers: {
          'Client-ID': CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
      });
      const vodData = await vodRes.json();
      return res.json({
        live: false,
        stream: null,
        pastStreams: vodData.data || []
      });
    }

    // user is live
    res.json({
      live: true,
      stream: stream
    });

  } catch (err) {
    console.error(err);
    res.json({ live: false, error: err.message || 'Unknown error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Twitch backend API running on port ${PORT}`);
});