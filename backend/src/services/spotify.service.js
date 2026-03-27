// src/services/spotify.service.js
import fetch from 'node-fetch';
import fs from 'fs';

let SPOTIFY_CLIENT_ID = '';
let SPOTIFY_CLIENT_SECRET = '';
let SPOTIFY_REFRESH_TOKEN = '';

// Load Docker secrets
try {
  SPOTIFY_CLIENT_ID = fs.readFileSync('/run/secrets/spotify_client_id', 'utf-8').trim();
  SPOTIFY_CLIENT_SECRET = fs.readFileSync('/run/secrets/spotify_client_secret', 'utf-8').trim();
  SPOTIFY_REFRESH_TOKEN = fs.readFileSync('/run/secrets/spotify_refresh_token', 'utf-8').trim();

  if (SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN) {
    console.log('Spotify secrets loaded');
  } else {
    console.warn('Spotify secrets are incomplete. Spotify API will fail.');
  }
} catch (err) {
  console.warn('Spotify secrets missing. Spotify API will fail.', err);
}

let accessToken = null;
let tokenExpiry = 0;

export async function getSpotifyAccessToken() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error('Spotify secrets missing or incomplete');
  }

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
  tokenExpiry = Date.now() + data.expires_in * 1000;
  console.log('Spotify access token refreshed, expires in', data.expires_in, 'seconds');

  return accessToken;
}

// ----------------- CURRENTLY PLAYING -----------------
export async function getSpotifyNowPlaying() {
  const token = await getSpotifyAccessToken();

  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) return { isPlaying: false };

  const data = await res.json();

  return {
    isPlaying: data.is_playing ?? false,
    songName: data.item?.name ?? '',
    artistName: data.item?.artists?.map(a => a.name).join(', ') ?? '',
    albumName: data.item?.album?.name ?? '',
    albumArtUrl: data.item?.album?.images?.[0]?.url ?? '',
    url: data.item?.external_urls?.spotify ?? '',
  };
}

// ----------------- RECENTLY PLAYED -----------------
export async function getSpotifyHistory(limit = 10) {
  const token = await getSpotifyAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) throw new Error('Failed to fetch Spotify history');

  const data = await res.json();

  return data.items.map(item => ({
    songName: item.track?.name ?? '',
    artistName: item.track?.artists?.map(a => a.name).join(', ') ?? '',
    albumName: item.track?.album?.name ?? '',
    albumArtUrl: item.track?.album?.images?.[0]?.url ?? '',
    url: item.track?.external_urls?.spotify ?? '',
    playedAt: item.played_at,
  }));
}