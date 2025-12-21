// backend/middleware/auth.js

const authMiddleware = (req, res, next) => {
  // TEMP SIMPLE AUTH (no JWT yet)
  const role = req.headers["x-role"] || "user";

  req.user = {
    role,
  };

  next(); // ✅ NEVER block basic requests
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }
  next();
};

module.exports = { authMiddleware, adminOnly };
