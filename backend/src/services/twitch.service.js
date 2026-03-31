import fetch from 'node-fetch';
import fs from 'fs';

let CLIENT_ID = '';
let CLIENT_SECRET = '';

try {
  CLIENT_ID = fs.readFileSync('/run/secrets/twitch_client_id', 'utf-8').trim();
  CLIENT_SECRET = fs.readFileSync('/run/secrets/twitch_client_secret', 'utf-8').trim();

  console.log('✅ Twitch secrets loaded');
} catch (err) {
  console.error('❌ Twitch secrets missing — check Docker secrets mount');
}

// 🔴 Hard fail (same pattern as Spotify)
if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error('Twitch CLIENT_ID or CLIENT_SECRET missing');
}

// Export for routes
export { CLIENT_ID, CLIENT_SECRET };

let accessToken = null;
let tokenExpiry = 0;

export async function getTwitchAccessToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpiry) return accessToken;

  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    throw new Error('Failed to get access token: ' + JSON.stringify(data));
  }

  accessToken = data.access_token;

  // ✅ buffer (you already had this 👍)
  tokenExpiry = now + (data.expires_in * 1000) - 60000;

  console.log('Twitch token refreshed');

  return accessToken;
}

export function formatTwitchThumbnail(url, width = 340, height = 360) {
  if (!url) return null;

  let clean = url;

  // Step 1: aggressively decode URI components
  try {
    clean = decodeURIComponent(clean);
  } catch (e) {
    // fallback: replace double-encoded %
    clean = clean.replace(/%25/g, '%');
  }

  // Step 2: replace any Twitch placeholders {width}/{height}, case-insensitive
  clean = clean
    .replace(/{width}/gi, width.toString())
    .replace(/{height}/gi, height.toString())
    .replace(/%{width}/gi, width.toString())
    .replace(/%{height}/gi, height.toString());

  // Step 3: replace any broken numeric patterns like %320x%180 globally
  clean = clean.replace(/%?\d+x%?\d+/g, `${width}x${height}`);

  // Step 4: remove duplicate slashes (except protocol)
  clean = clean.replace(/([^:]\/)\/+/g, '$1');

  return clean;
}