// models/subjectModel.js
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true }, // Track whether the subject is active
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
