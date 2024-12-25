const mongoose = require("mongoose");

const mainSubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true, // Default to active
    },
  },
  { timestamps: true }
);

const MainSubject = mongoose.model("MainSubject", mainSubjectSchema);

module.exports = MainSubject;
