const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route
router.get("/", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

module.exports = router;
