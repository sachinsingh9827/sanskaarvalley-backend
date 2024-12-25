const express = require("express");
const {
  createSubject, // renamed from addSubject to match controller
  getSubjects, // renamed from getAllSubjects to match controller
  deleteSubject,
  updateSubject,
  toggleActiveStatus,
  getActiveSubjects,
} = require("../controllers/subjectController");

const router = express.Router();

router.post("/", createSubject); // Create a new subject (post)
router.get("/all-subjects", getSubjects); // Get all subjects
router.put("/update/:id", updateSubject); // Update a subject (put)
router.delete("/delete/:id", deleteSubject);
router.put("/toggle-status/:id", toggleActiveStatus); // Delete a subject by ID
router.get("/active-subjects", getActiveSubjects);

module.exports = router;
