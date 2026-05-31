import dotenv from "dotenv";
import webpush from "web-push";
import { initDb, getDb } from "../db/database.js";

dotenv.config();

async function createVapidKeys() {
  try {
    await initDb();
    const db = getDb();

    // 1. CHECK EXISTING KEYS
    const settings = await db.get(`
      SELECT vapidPublicKey, vapidPrivateKey
      FROM settings
      LIMIT 1
    `);

    // 2. EXIT IF ALREADY EXISTS
    if (
      settings?.vapidPublicKey &&
      settings?.vapidPrivateKey
    ) {
      console.log("✅ VAPID keys already exist");
      process.exit(0);
    }

    // 3. GENERATE NEW KEYS
    const keys = webpush.generateVAPIDKeys();

    await db.run(
      `
      UPDATE settings
      SET vapidPublicKey = ?,
          vapidPrivateKey = ?
      `,
      [
        keys.publicKey,
        keys.privateKey
      ]
    );

    console.log("🔐 Generated VAPID keys");

    process.exit(0);

  } catch (err) {
    console.error(
      "❌ VAPID bootstrap failed:",
      err
    );

    process.exit(1);
  }
}

createVapidKeys();