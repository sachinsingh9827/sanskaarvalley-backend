const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    isActive: { type: Boolean, default: true }, // To allow toggling FAQ visibility
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("FAQ", faqSchema);
