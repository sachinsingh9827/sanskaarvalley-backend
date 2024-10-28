const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    role: { type: String, default: "admin" },
    isActive: { type: Boolean, default: true },
    login: { type: Boolean, default: false }, // Track if the admin is logged in
    resetPasswordToken: { type: String }, // Store OTP for reset
    resetTokenExpiry: { type: Date }, // Store expiration time for OTP
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
