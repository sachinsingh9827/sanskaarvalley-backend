const TermsAndConditions = require("../models/termsAndConditionsModel");
const errorMessages = require("../utils/errorMessages");

// Create a new Terms and Conditions
const createTermsAndConditions = async (req, res) => {
  try {
    const { title, content, isActive } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const termsAndConditions = new TermsAndConditions({
      title,
      content,
      isActive,
    });

    await termsAndConditions.save();
    res.status(201).json({
      message: "Terms and Conditions created successfully",
      termsAndConditions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Terms and Conditions" });
  }
};

// Get all Terms and Conditions with pagination
const getAllTermsAndConditions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const termsAndConditions = await TermsAndConditions.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Terms and Conditions fetched successfully.",
      termsAndConditions,
    });
  } catch (error) {
    console.error("Error fetching Terms and Conditions:", error);
    res.status(500).json({ message: "Failed to fetch Terms and Conditions" });
  }
};

// Get Terms and Conditions by ID
const getTermsAndConditionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const termsAndConditions = await TermsAndConditions.findById(id);

    if (!termsAndConditions) {
      return res
        .status(404)
        .json({ message: "Terms and Conditions not found" });
    }

    res.status(200).json(termsAndConditions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Terms and Conditions" });
  }
};

// Get all active Terms and Conditions
const getActiveTermsAndConditions = async (req, res) => {
  try {
    const activeTerms = await TermsAndConditions.find({ isActive: true });
    res.status(200).json({
      message: "Active Terms and Conditions fetched successfully.",
      activeTerms,
    });
  } catch (error) {
    console.error("Error fetching active Terms and Conditions:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch active Terms and Conditions" });
  }
};

// Update a Terms and Conditions by ID
const updateTermsAndConditions = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isActive } = req.body;

    const termsAndConditions = await TermsAndConditions.findByIdAndUpdate(
      id,
      { title, content, isActive },
      { new: true }
    );

    if (!termsAndConditions) {
      return res
        .status(404)
        .json({ message: "Terms and Conditions not found" });
    }

    res.status(200).json({
      message: "Terms and Conditions updated successfully",
      termsAndConditions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Terms and Conditions" });
  }
};

// Delete a Terms and Conditions by ID
const deleteTermsAndConditions = async (req, res) => {
  try {
    const { id } = req.params;
    const termsAndConditions = await TermsAndConditions.findByIdAndDelete(id);

    if (!termsAndConditions) {
      return res
        .status(404)
        .json({ message: "Terms and Conditions not found" });
    }

    res
      .status(200)
      .json({ message: "Terms and Conditions deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Terms and Conditions" });
  }
};

module.exports = {
  createTermsAndConditions,
  getAllTermsAndConditions,
  getTermsAndConditionsById,
  updateTermsAndConditions,
  deleteTermsAndConditions,
  getActiveTermsAndConditions,
};
