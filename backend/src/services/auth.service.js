import bcrypt from "bcrypt";
import { getDb } from "../db/database.js";
import { signToken } from "../utils/jwt.js";
import { findUserByEmail } from "../db/users.repo.js";

// LOGIN USER
export async function loginUser(email, password) {
  console.log("🔐 LOGIN INPUT:", { email, password });

  const user = await findUserByEmail(email);

  console.log("👤 DB USER:", user);

  if (!user) {
    console.log("❌ USER NOT FOUND");
    throw new Error("INVALID_CREDENTIALS");
  }

  console.log("🔑 PASSWORD ENTERED:", password);
  console.log("🔑 HASH FROM DB:", user.password_hash);

  const valid = await bcrypt.compare(password, user.password_hash);

  console.log("🧪 BCRYPT VALID:", valid);

  if (!valid) {
    console.log("❌ PASSWORD FAIL");
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = signToken(user);

  return { user, token };
}