const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    type: {
      type: String,
      enum: ["car", "bike", "truck", "bus"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
    },

    // Vehicle assigned to user
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Telemetry (optional – future use)
    telemetry: {
      speed: {
        type: Number,
        default: 0,
      },
      battery: {
        type: Number,
        default: 100,
      },
      temperature: {
        type: Number,
        default: 25,
      },
      gps: {
        lat: {
          type: Number,
          default: 0,
        },
        lng: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
