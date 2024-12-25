const mongoose = require("mongoose");

const privacyPolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // To automatically add createdAt and updatedAt fields
  }
);

const PrivacyPolicy = mongoose.model("PrivacyPolicy", privacyPolicySchema);

module.exports = PrivacyPolicy;
