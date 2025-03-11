const Review = require("../models/ReviewModel");

// ✅ Submit a Review
exports.submitReview = async (req, res) => {
  try {
    const { email, name, rating, comment } = req.body;

    if (!email || !name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields (email, name, rating, comment) are required",
      });
    }

    const newReview = new Review({ email, name, rating, comment });
    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Get All Reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().lean();
    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Get Reviews by Status (pending, approved, rejected)
exports.getReviewsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const reviews = await Review.find({ status }).lean();
    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Update Review Status (Single or Multiple)
exports.updateReviewStatus = async (req, res) => {
  try {
    const { reviewIds, status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    if (!reviewIds || (Array.isArray(reviewIds) && reviewIds.length === 0)) {
      return res
        .status(400)
        .json({ success: false, message: "Review ID(s) required" });
    }

    let updatedReviews;
    if (Array.isArray(reviewIds)) {
      // ✅ Bulk Update
      updatedReviews = await Review.updateMany(
        { _id: { $in: reviewIds } },
        { status }
      );

      return res.status(200).json({
        success: true,
        message: `${updatedReviews.modifiedCount} reviews updated successfully`,
      });
    } else {
      // ✅ Single Update
      updatedReviews = await Review.findByIdAndUpdate(
        reviewIds,
        { status },
        { new: true, runValidators: true }
      ).lean();

      if (!updatedReviews) {
        return res
          .status(404)
          .json({ success: false, message: "Review not found" });
      }

      return res.status(200).json({
        success: true,
        message: `Review updated successfully`,
        review: updatedReviews,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
