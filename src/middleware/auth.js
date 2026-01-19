import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";

  // Accept both "Bearer <token>" and "<token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
