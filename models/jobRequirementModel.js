const mongoose = require("mongoose");

const jobRequirementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    experience: {
      type: String, // Example: "2-3 years"
    },
    location: {
      type: String,
    },
    closingDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Job posting is active by default
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobRequirement", jobRequirementSchema);
