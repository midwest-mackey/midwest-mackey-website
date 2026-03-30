import fetch from 'node-fetch';
import fs from 'fs';

let SPOTIFY_CLIENT_ID = '';
let SPOTIFY_CLIENT_SECRET = '';
let SPOTIFY_REFRESH_TOKEN = '';

try {
  SPOTIFY_CLIENT_ID = fs.readFileSync('/run/secrets/spotify_client_id', 'utf-8').trim();
  SPOTIFY_CLIENT_SECRET = fs.readFileSync('/run/secrets/spotify_client_secret', 'utf-8').trim();
  SPOTIFY_REFRESH_TOKEN = fs.readFileSync('/run/secrets/spotify_refresh_token', 'utf-8').trim();

  console.log('✅ Spotify secrets loaded');
} catch (err) {
  console.error('❌ Spotify secrets missing — check Docker secrets mount');
}

// 🔴 Hard fail if missing (this is good for prod)
if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
  throw new Error('Spotify secrets missing or incomplete');
}

let accessToken = null;
let tokenExpiry = 0;

export async function getSpotifyAccessToken() {
  if (accessToken && Date.now() < tokenExpiry) return accessToken;

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    throw new Error('Failed to get Spotify access token: ' + JSON.stringify(data));
  }

  accessToken = data.access_token;

  // ✅ Add buffer (prevents edge expiry bugs)
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;

  console.log('Spotify access token refreshed');

  return accessToken;
}