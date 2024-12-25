const FAQ = require("../models/faqModel");
const errorMessages = require("../utils/errorMessages");

// Create a new FAQ
const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Question and Answer are required." });
    }

    const faq = new FAQ({ question, answer });
    await faq.save();

    res.status(201).json({ message: "FAQ created successfully.", faq });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res
      .status(500)
      .json({ message: "Failed to create FAQ.", error: error.message });
  }
};

// Get all FAQs with pagination
const getAllFAQs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10

    // Convert query params to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (pageNumber <= 0 || limitNumber <= 0) {
      return res
        .status(400)
        .json({ message: "Page and limit must be positive integers." });
    }

    // Fetch FAQs with pagination
    const faqs = await FAQ.find()
      .sort({ createdAt: -1 }) // Sort by most recent
      .skip((pageNumber - 1) * limitNumber) // Skip records for the previous pages
      .limit(limitNumber); // Limit to the specified number of records

    // Get the total count for pagination metadata
    const totalFAQs = await FAQ.countDocuments();

    res.status(200).json({
      message: "FAQs fetched successfully.",
      faqs,
      pagination: {
        totalItems: totalFAQs,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalFAQs / limitNumber),
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch FAQs.", error: error.message });
  }
};

// Get active FAQs only
const getActiveFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true });
    res
      .status(200)
      .json({ message: "Active FAQs fetched successfully.", faqs });
  } catch (error) {
    console.error("Error fetching active FAQs:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch active FAQs.", error: error.message });
  }
};

// Update an FAQ
const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, isActive } = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      id,
      { question, answer, isActive },
      { new: true } // Return updated FAQ
    );

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found." });
    }

    res.status(200).json({ message: "FAQ updated successfully.", faq });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res
      .status(500)
      .json({ message: "Failed to update FAQ.", error: error.message });
  }
};

// Delete an FAQ
const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found." });
    }

    res.status(200).json({ message: "FAQ deleted successfully." });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res
      .status(500)
      .json({ message: "Failed to delete FAQ.", error: error.message });
  }
};

module.exports = {
  createFAQ,
  getAllFAQs,
  getActiveFAQs,
  updateFAQ,
  deleteFAQ,
};
