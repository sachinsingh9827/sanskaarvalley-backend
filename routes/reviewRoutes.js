const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// ✅ Submit a Review
router.post("/submit", reviewController.submitReview);

// ✅ Get All Reviews
router.get("/all", reviewController.getAllReviews);

// ✅ Get Reviews by Status (pending, approved, rejected)
router.get("/status/:status", reviewController.getReviewsByStatus);

// ✅ Update Review Status (Single or Multiple)
router.put("/update-status", reviewController.updateReviewStatus);

module.exports = router;
