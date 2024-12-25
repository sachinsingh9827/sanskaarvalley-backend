const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, "Class name is required."], // Added validation message
  },
  section: {
    type: String,
    default: "A",
  },
  roomNumber: {
    type: String,
    required: [true, "Room number is required."], // Added validation message
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  timing: {
    type: String,
    required: [true, "Class timing is required."], // Added validation message
  },
  mainSubject: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
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
