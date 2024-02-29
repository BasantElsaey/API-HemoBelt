const mongoose = require("mongoose");

const pathientRequestsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patientRequests", pathientRequestsSchema);
