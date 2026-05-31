import fetch from 'node-fetch';
import fs from 'fs';

let initialized = false;

let CLIENT_ID;
let CLIENT_SECRET;

// LAZY INIT (Docker-safe)
function initTwitchSecrets() {
  if (initialized) return;
  initialized = true;

  try {
    CLIENT_ID = fs.readFileSync('/run/secrets/twitch_client_id', 'utf-8').trim();
    CLIENT_SECRET = fs.readFileSync('/run/secrets/twitch_client_secret', 'utf-8').trim();

    console.log('✅ Twitch secrets loaded');
  } catch (err) {
    throw new Error('Twitch secrets missing — check Docker secrets');
  }
}

export { CLIENT_ID };

let accessToken = null;
let tokenExpiry = 0;

// GET TWITCH ACCESS TOKEN
export async function getTwitchAccessToken() {
  initTwitchSecrets();

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
    throw new Error('Twitch token failed: ' + JSON.stringify(data));
  }

  accessToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000 - 60000;

  console.log('Twitch token refreshed');

  return accessToken;
}

// FORMAT TWITCH THUMBNAIL URL
export function formatTwitchThumbnail(url, width = 340, height = 360) {
  if (!url) return null;
  let clean = url;
  try { clean = decodeURIComponent(clean); } catch (e) { clean = clean.replace(/%25/g, '%'); }
  clean = clean.replace(/{width}/gi, width.toString())
               .replace(/{height}/gi, height.toString())
               .replace(/%{width}/gi, width.toString())
               .replace(/%{height}/gi, height.toString());
  clean = clean.replace(/%?\d+x%?\d+/g, `${width}x${height}`);
  clean = clean.replace(/([^:]\/)\/+/g, '$1');
  return clean;
}