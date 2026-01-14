const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.put("/users/:id", protect, authorizeRoles("admin"), updateUser);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;
