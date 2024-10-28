// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { createContactMessage } = require("../controllers/contactController");

// Define the route for contacting us
router.post("/", createContactMessage); // Post contact message

module.exports = router;
