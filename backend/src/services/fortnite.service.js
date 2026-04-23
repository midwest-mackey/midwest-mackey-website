import fetch from 'node-fetch';
import fs from 'fs';
import { getConfig } from './config.service.js';

// 🔐 API KEY (Docker Secret)
let FORTNITE_API_KEY = '';

try {
  FORTNITE_API_KEY = fs
    .readFileSync('/run/secrets/fortnite_api_key', 'utf-8')
    .trim();

  console.log('✅ Fortnite secret loaded');
} catch (err) {
  console.error('❌ Fortnite secret missing — check Docker secrets mount');
}

if (!FORTNITE_API_KEY) {
  throw new Error('Fortnite API key missing');
}

// ⚙️ CONFIG HELPERS
export function getConfigValue(path, fallback = null) {
  const config = getConfig();

  return path
    .split('.')
    .reduce((obj, key) => obj?.[key], config) ?? fallback;
}

// 🌐 PUBLIC BASE URL (IMPORTANT)
const BASE_URL_PUBLIC = getConfigValue(
  'server.publicUrl',
  'http://localhost:3000'
);

function resolveImage(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${BASE_URL_PUBLIC}${url}`;
}

function getFeaturedCosmeticId() {
  return getConfigValue('fortnite.featuredCosmeticId');
}

// Fallback Helper
function getCosmeticFallbackImage(cosmeticId) {
  const fallbacks = getConfigValue('fortnite.cosmeticImageFallbacks', {});
  return fallbacks?.[cosmeticId] || null;
}

// ⚡ CACHE
const statsCache = new Map();
const cosmeticCache = new Map();

const STATS_TTL = 1000 * 60 * 5;
const COSMETIC_TTL = 1000 * 60 * 60;

const BASE_URL = 'https://fortnite-api.com/v2/stats/br/v2';

// 📊 STATS
export async function getFortniteStats(username) {
  const key = username.toLowerCase();
  const cached = statsCache.get(key);

  if (cached && Date.now() - cached.timestamp < STATS_TTL) {
    return cached.data;
  }

  const res = await fetch(`${BASE_URL}?name=${username}`, {
    headers: {
      Authorization: FORTNITE_API_KEY
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(data));
  }

  const all = data?.data?.stats?.all;

  if (!all) {
    throw new Error('No stats found for player');
  }

  const buildBlock = (src = {}) => ({
    wins: src.wins ?? 0,
    kills: src.kills ?? 0,
    matches: src.matches ?? 0,
    kd: src.kd ?? 0,
    winRate: src.winRate ?? 0
  });

  const result = {
    playerName: data.data.account.name,
    overall: buildBlock(all.overall),
    solo: buildBlock(all.solo),
    duo: buildBlock(all.duo),
    squad: buildBlock(all.squad)
  };

  statsCache.set(key, {
    timestamp: Date.now(),
    data: result
  });

  return result;
}

// 🎭 COSMETIC
export async function getFortniteCosmeticById(cosmeticId) {
  const idToUse = cosmeticId || getFeaturedCosmeticId();

  if (!idToUse) {
    throw new Error('No cosmetic ID provided or configured');
  }

  const cached = cosmeticCache.get(idToUse);

  if (cached && Date.now() - cached.timestamp < COSMETIC_TTL) {
    return cached.data;
  }

  const res = await fetch(
    `https://fortnite-api.com/v2/cosmetics/br/${idToUse}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(data));
  }

  const item = data?.data;

  if (!item) {
    throw new Error('Cosmetic not found');
  }

  // fallback from config
  const fallbackImage = getCosmeticFallbackImage(item.id);

  const result = {
    id: item.id,
    name: item.name,
    description: item.description,

    type: {
      value: item.type?.value || null,
      displayValue: item.type?.displayValue || null
    },

    rarity: {
      value: item.rarity?.value || null,
      displayValue: item.rarity?.displayValue || null
    },

    series: item.series
      ? {
          value: item.series.value || null,
          image: item.series.image || null,
          colors: (item.series.colors || []).map(c =>
            `#${c.substring(0, 6)}`
          )
        }
      : null,

    images: {
      icon: resolveImage(item.images?.icon),
      smallIcon: resolveImage(item.images?.smallIcon),

      // ONLY featured uses fallback logic
      featured: resolveImage(item.images?.featured || fallbackImage),

      background: resolveImage(item.images?.background)
    }
  };

  cosmeticCache.set(idToUse, {
    timestamp: Date.now(),
    data: result
  });

  return result;
}