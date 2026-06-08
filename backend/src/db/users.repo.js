import { getDb } from "./database.js";

// FIND USER BY EMAIL
export async function findUserByEmail(email) {
  const db = getDb();

  const cleanEmail = email?.trim();

  // console.log("🔍 findUserByEmail input:", cleanEmail);

  const user = await db.get(
    "SELECT * FROM users WHERE email = ?",
    [cleanEmail]
  );

  // console.log("🔎 findUserByEmail result:", user);

  return user;
}

// FIND USER BY ID
export async function findUserById(id) {
  const db = getDb();

  return db.get(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
}

// UPDATE USER ACCOUNT
export async function updateUserAccount(
  id,
  email,
  passwordHash
) {
  const db = getDb();

  return db.run(
    `
    UPDATE users
    SET email = ?,
        password_hash = ?
    WHERE id = ?
    `,
    [email, passwordHash, id]
  );
}