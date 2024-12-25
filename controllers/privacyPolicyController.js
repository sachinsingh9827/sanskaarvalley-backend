const PrivacyPolicy = require("../models/privacyPolicyModel");
const errorMessages = require("../utils/errorMessages");

// Create a new Privacy Policy
const createPrivacyPolicy = async (req, res) => {
  try {
    const { title, content, isActive } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    const newPrivacyPolicy = new PrivacyPolicy({
      title,
      content,
      isActive,
    });

    await newPrivacyPolicy.save();

    res.status(201).json({
      message: "Privacy Policy created successfully.",
      privacyPolicy: newPrivacyPolicy,
    });
  } catch (error) {
    console.error("Error creating Privacy Policy:", error);
    res.status(500).json({
      message: "Failed to create Privacy Policy.",
      error: error.message,
    });
  }
};

// Get all Privacy Policies with pagination
const getAllPrivacyPolicies = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (pageNumber <= 0 || limitNumber <= 0) {
      return res
        .status(400)
        .json({ message: "Page and limit must be positive integers." });
    }

    const privacyPolicies = await PrivacyPolicy.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalPolicies = await PrivacyPolicy.countDocuments();

    res.status(200).json({
      message: "Privacy Policies fetched successfully.",
      privacyPolicies,
      pagination: {
        totalItems: totalPolicies,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPolicies / limitNumber),
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching Privacy Policies:", error);
    res.status(500).json({
      message: "Failed to fetch Privacy Policies.",
      error: error.message,
    });
  }
};
// Get all active Privacy Policies
const getActivePrivacyPolicies = async (req, res) => {
  try {
    const activePolicies = await PrivacyPolicy.find({ isActive: true }).sort({
      createdAt: -1,
    }); // Sort by most recent

    if (!activePolicies.length) {
      return res
        .status(404)
        .json({ message: "No active Privacy Policies found." });
    }

    res.status(200).json({
      message: "Active Privacy Policies fetched successfully.",
      activePolicies,
    });
  } catch (error) {
    console.error("Error fetching active Privacy Policies:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch active Privacy Policies.",
        error: error.message,
      });
  }
};

// Get a single Privacy Policy by ID
const getPrivacyPolicyById = async (req, res) => {
  try {
    const { id } = req.params;
    const privacyPolicy = await PrivacyPolicy.findById(id);

    if (!privacyPolicy) {
      return res.status(404).json({ message: "Privacy Policy not found." });
    }

    res.status(200).json(privacyPolicy);
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    res.status(500).json({
      message: "Failed to fetch Privacy Policy.",
      error: error.message,
    });
  }
};

// Update a Privacy Policy
const updatePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isActive } = req.body;

    const updatedPrivacyPolicy = await PrivacyPolicy.findByIdAndUpdate(
      id,
      { title, content, isActive },
      { new: true }
    );

    if (!updatedPrivacyPolicy) {
      return res.status(404).json({ message: "Privacy Policy not found." });
    }

    res.status(200).json({
      message: "Privacy Policy updated successfully.",
      privacyPolicy: updatedPrivacyPolicy,
    });
  } catch (error) {
    console.error("Error updating Privacy Policy:", error);
    res.status(500).json({
      message: "Failed to update Privacy Policy.",
      error: error.message,
    });
  }
};

// Delete a Privacy Policy
const deletePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPrivacyPolicy = await PrivacyPolicy.findByIdAndDelete(id);

    if (!deletedPrivacyPolicy) {
      return res.status(404).json({ message: "Privacy Policy not found." });
    }

    res.status(200).json({ message: "Privacy Policy deleted successfully." });
  } catch (error) {
    console.error("Error deleting Privacy Policy:", error);
    res.status(500).json({
      message: "Failed to delete Privacy Policy.",
      error: error.message,
    });
  }
};

module.exports = {
  createPrivacyPolicy,
  getAllPrivacyPolicies,
  getPrivacyPolicyById,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
  getActivePrivacyPolicies,
};
