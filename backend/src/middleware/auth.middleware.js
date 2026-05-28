import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  // ✅ allow browser CORS preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Not authenticated"
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded; // { sub, email, role }
    next();

  } catch (err) {
    return res.status(401).json({
      error: "Invalid token"
    });
  }
}