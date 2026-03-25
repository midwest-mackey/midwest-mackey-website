import fetch from 'node-fetch';
import fs from 'fs';

let CLIENT_ID = '';
let CLIENT_SECRET = '';

try {
  CLIENT_ID = fs.readFileSync('/run/secrets/twitch_client_id', 'utf-8').trim();
  CLIENT_SECRET = fs.readFileSync('/run/secrets/twitch_client_secret', 'utf-8').trim();
  console.log('Twitch secrets loaded');
} catch (err) {
  console.warn('Twitch secrets not found. Twitch API will fail.', err);
}

let accessToken = null;
let tokenExpiry = 0;

export async function getTwitchAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) throw new Error('Twitch CLIENT_ID or CLIENT_SECRET missing');

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
  if (!data.access_token) throw new Error('Failed to get access token: ' + JSON.stringify(data));

  accessToken = data.access_token;
  tokenExpiry = now + (data.expires_in * 1000) - 60000;
  console.log('New Twitch token fetched, expires in', data.expires_in, 'seconds');
  return accessToken;
}