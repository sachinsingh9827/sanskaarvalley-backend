const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email validation
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters"], // Minimum length validation
      maxlength: [50, "Name cannot exceed 50 characters"], // Maximum length validation
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "Comment must be at least 5 characters"], // Prevent very short comments
      maxlength: [500, "Comment cannot exceed 500 characters"], // Prevent overly long comments
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, // Prevent modification of createdAt
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// Index for faster lookups based on email and status
reviewSchema.index({ email: 1 });
reviewSchema.index({ status: 1 });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
