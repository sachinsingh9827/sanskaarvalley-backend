const express = require("express");
const router = express.Router();
const {
  createClass,
  updateClass,
  deactivateClass,
  getAllClasses,
} = require("../controllers/classController");

// Routes
router.post("/", createClass); // Route to create a class
router.put("/:id", updateClass); // Route to update a class by ID
router.patch("/:id/deactivate", deactivateClass); // Route to deactivate a class by ID
router.get("/", getAllClasses); // Route to get all classes

module.exports = router;
