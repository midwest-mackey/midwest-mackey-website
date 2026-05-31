import fs from 'fs';

let cachedConfig = null;

// LOAD CONFIG
export function getConfig() {
  if (cachedConfig) return cachedConfig;

  try {
    cachedConfig = JSON.parse(
      fs.readFileSync('/app/config/config.json', 'utf-8')
    );
  } catch (err) {
    console.error('❌ Failed to load config.json', err);
    cachedConfig = {};
  }

  return cachedConfig;
}