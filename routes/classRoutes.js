const express = require("express");
const router = express.Router();
const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  toggleClassStatus,
  getActiveClasses,
  promoteStudents,
} = require("../controllers/classController");

// Create a new class
router.post("/", createClass);

// Get all classes
router.get("/", getAllClasses);

// Get all active classes
router.get("/active", getActiveClasses);

// Get a single class by ID
router.get("/:id", getClassById);

// Update a class by ID
router.put("/:id", updateClass);

// Delete a class by ID
router.delete("/:id", deleteClass);

// Toggle active/deactive status of a class
router.put("/toggle-status/:id", toggleClassStatus);

// Promote students from one class to another
router.post("/promote", promoteStudents);

module.exports = router;
