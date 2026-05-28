export function requireAdmin(req, res, next) {
  // ✅ allow CORS preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.user?.role) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}