import fs from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FORCE absolute db path (IMPORTANT)
const dbDir = path.resolve(__dirname, '../../db');
const dbPath = path.join(dbDir, 'orders.sqlite');

fs.mkdirSync(dbDir, { recursive: true });

let db;

export async function initDb() {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS egg_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        paymentType TEXT NOT NULL,
        pickupDate TEXT NOT NULL,
        dozenCount INTEGER NOT NULL,
        deviceId TEXT,
        unitPrice INTEGER NOT NULL,
        totalPrice INTEGER NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL
    )
    `);

    console.log('🗄️ SQLite ready at:', dbPath);
  } catch (err) {
    console.error('❌ SQLite init failed:', err);
    throw err;
  }
}

export function getDb() {
  if (!db) throw new Error('DB not initialized');
  return db;
}