const mongoose = require("mongoose");

const termsAndConditionsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isActive: { type: Boolean, default: true }, // Indicates if the T&C is active
  },
  { timestamps: true }
);

module.exports = mongoose.model("TermsAndConditions", termsAndConditionsSchema);
