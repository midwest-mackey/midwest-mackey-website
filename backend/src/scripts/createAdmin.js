import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { initDb, getDb } from "../db/database.js";

dotenv.config();

async function createAdmin() {
  try {
    await initDb();
    const db = getDb();

    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "change_me";
    const ADMIN_ID = 1;

    // 1. CHECK IF USER ALREADY EXISTS
    const existingUser = await db.get(
      "SELECT * FROM users WHERE id = ?",
      ADMIN_ID
    );

    // 2. IF EXISTS → ENSURE ROLE IS ADMIN (fix drift)
    if (existingUser) {
      if (existingUser.role !== "admin") {
        await db.run(
          "UPDATE users SET role = 'admin' WHERE id = ?",
          ADMIN_ID
        );
        
        console.log(`🔁 Upgraded existing user to admin: ${email}`);
      } else {
        console.log(`✅ Admin already exists: ${email}`);
      }

      process.exit(0);
    }

    // 3. CREATE NEW ADMIN (ONLY IF DOES NOT EXIST)
    const hash = await bcrypt.hash(password, 10);

    await db.run(
      `
      INSERT INTO users (id, email, password_hash, role, createdAt)
      VALUES (?, ?, ?, 'admin', ?)
      `,
      [ADMIN_ID, email, hash, new Date().toISOString()]
    );

    console.log("✅ Admin created (fixed ID: 1)");
    process.exit(0);

  } catch (err) {
    console.error("❌ Admin bootstrap failed:", err);
    process.exit(1);
  }
}

createAdmin();