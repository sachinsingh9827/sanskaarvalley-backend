// routes/studentRoutes.js
const express = require("express");
const { addStudent } = require("../controllers/studentController");

const router = express.Router();

// Route to add a new student
router.post("/", addStudent);

module.exports = router;
