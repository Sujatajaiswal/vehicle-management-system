const Vehicle = require("../models/Vehicle");

/* =========================================================
   ADMIN: CREATE VEHICLE
========================================================= */
const createVehicle = async (req, res) => {
  try {
    const { vehicleName, vehicleNumber, type } = req.body;

    // Validation
    if (!vehicleName || !vehicleNumber || !type) {
      return res.status(400).json({
        message: "vehicleName, vehicleNumber and type are required",
      });
    }

    // Check duplicate
    const vehicleExists = await Vehicle.findOne({ vehicleNumber });
    if (vehicleExists) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }

    // Create vehicle
    const vehicle = await Vehicle.create({
      vehicleName,
      vehicleNumber,
      type,
      status: "active",
    });

    res.status(201).json({
      message: "Vehicle created successfully",
      vehicle,
    });
  } catch (error) {
    console.error("CREATE VEHICLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   ADMIN: GET ALL VEHICLES
========================================================= */
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(vehicles);
  } catch (error) {
    console.error("GET ALL VEHICLES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   ADMIN: GET VEHICLE BY ID
========================================================= */
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate(
      "assignedTo",
      "name email role"
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error("GET VEHICLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   ADMIN: UPDATE VEHICLE
========================================================= */
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.vehicleName = req.body.vehicleName || vehicle.vehicleName;
    vehicle.vehicleNumber = req.body.vehicleNumber || vehicle.vehicleNumber;
    vehicle.type = req.body.type || vehicle.type;
    vehicle.status = req.body.status || vehicle.status;

    await vehicle.save();

    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    console.error("UPDATE VEHICLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   ADMIN: DELETE VEHICLE
========================================================= */
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await vehicle.deleteOne();

    res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("DELETE VEHICLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   ADMIN: ASSIGN VEHICLE TO USER
========================================================= */
const assignVehicle = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.assignedTo = userId;
    await vehicle.save();

    res.status(200).json({
      message: "Vehicle assigned successfully",
      vehicle,
    });
  } catch (error) {
    console.error("ASSIGN VEHICLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   USER: VIEW MY ASSIGNED VEHICLES
========================================================= */
const getMyVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      assignedTo: req.user.userId,
    });

    res.status(200).json(vehicles);
  } catch (error) {
    console.error("GET MY VEHICLES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   EXPORTS
========================================================= */
module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  assignVehicle,
  getMyVehicles,
};
