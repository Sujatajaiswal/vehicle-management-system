const express = require("express");
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  assignVehicle,
  getMyVehicles,
} = require("../controllers/vehicleController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

/* ================= USER ROUTES ================= */
// User can view only assigned vehicles
router.get("/my", protect, authorizeRoles("user", "admin"), getMyVehicles);

/* ================= ADMIN ROUTES ================= */
// Create vehicle
router.post("/", protect, authorizeRoles("admin"), createVehicle);

// Get all vehicles
router.get("/", protect, authorizeRoles("admin"), getAllVehicles);

// Get vehicle details by ID
router.get("/:id", protect, authorizeRoles("admin"), getVehicleById);

// Update vehicle
router.put("/:id", protect, authorizeRoles("admin"), updateVehicle);

// Delete vehicle
router.delete("/:id", protect, authorizeRoles("admin"), deleteVehicle);

// Assign vehicle to user
router.put("/:id/assign", protect, authorizeRoles("admin"), assignVehicle);

module.exports = router;
