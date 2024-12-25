const express = require("express");
const {
  createTermsAndConditions,
  getAllTermsAndConditions,
  getTermsAndConditionsById,
  updateTermsAndConditions,
  deleteTermsAndConditions,
  getActiveTermsAndConditions,
} = require("../controllers/termsAndConditionsController");

const router = express.Router();

// Create a new Terms and Conditions
router.post("/", createTermsAndConditions);

// Get all Terms and Conditions with pagination
router.get("/", getAllTermsAndConditions);

// Get all active Terms and Conditions
router.get("/active", getActiveTermsAndConditions);

// Get a Terms and Conditions by ID
router.get("/:id", getTermsAndConditionsById);

// Update a Terms and Conditions by ID
router.put("/:id", updateTermsAndConditions);

// Delete a Terms and Conditions by ID
router.delete("/:id", deleteTermsAndConditions);

module.exports = router;
