const express = require("express");
const {
  createJobRequirement,
  getAllJobRequirements,
  getActiveJobRequirements,
  deleteJobRequirement,
  toggleJobRequirementStatus,
  updateJobRequirement,
} = require("../controllers/jobRequirementController");

const router = express.Router();

// Post a new job requirement
router.post("/", createJobRequirement);

// Get all job requirements with pagination
router.get("/", getAllJobRequirements);

// Get active job requirements
router.get("/active", getActiveJobRequirements);
router.delete("/:id", deleteJobRequirement);
router.put("/toggle-status/:id", toggleJobRequirementStatus);
router.put("/:id", updateJobRequirement);

module.exports = router;
