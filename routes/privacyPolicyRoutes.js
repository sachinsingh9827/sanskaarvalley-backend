const express = require("express");
const {
  createPrivacyPolicy,
  getAllPrivacyPolicies,
  getPrivacyPolicyById,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
  getActivePrivacyPolicies,
} = require("../controllers/privacyPolicyController");

const router = express.Router();

// Create a new Privacy Policy
router.post("/", createPrivacyPolicy);

// Get all Privacy Policies with pagination
router.get("/", getAllPrivacyPolicies);

// Get all active Privacy Policies
router.get("/active", getActivePrivacyPolicies); // <-- Updated path

// Get a Privacy Policy by ID
router.get("/:id", getPrivacyPolicyById);

// Update a Privacy Policy
router.put("/:id", updatePrivacyPolicy);

// Delete a Privacy Policy
router.delete("/:id", deletePrivacyPolicy);

module.exports = router;
