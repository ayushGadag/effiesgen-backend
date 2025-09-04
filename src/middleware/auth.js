// src/middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user info (id, role) in request object
    req.user = decoded;

    next(); // continue to the next middleware/controller
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = auth;
