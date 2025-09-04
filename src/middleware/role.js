// src/middleware/role.js

/**
 * Role-based access middleware
 * Only allows users whose role is included in the provided roles array
 */
module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      // check if user role is allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      next(); // move to next middleware/controller
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Role check failed",
        error: err.message,
      });
    }
  };
};
