const express = require("express");
const {
  addSubject,
  getAllSubjects,
  deleteSubject,
} = require("../controllers/subjectController");

const router = express.Router();

router.post("/add", addSubject); // Add a new subject
router.get("/all-subjects", getAllSubjects); // Get all subjects
router.put("/deactivate/:id", deleteSubject);
router.delete("/delete/:id", deleteSubject); // Deactivate a subject by ID

module.exports = router;
