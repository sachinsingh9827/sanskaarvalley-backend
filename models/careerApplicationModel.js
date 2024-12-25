const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      required: true,
    },
    resume: {
      type: String, // File path or URL of uploaded resume
      required: true,
    },
    coverLetter: {
      type: String, // Cover letter text (optional)
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Shortlisted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerApplication", careerApplicationSchema);
