const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true, // Default value for isActive
  },
  mainSubject: {
    type: String,
    default: "", // Default value for mainSubject
  },
  subjects: {
    type: [String], // Array of subjects
    default: [], // Default to an empty array if not provided
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
