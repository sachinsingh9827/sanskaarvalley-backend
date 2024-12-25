// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContactMessage,
  getAllContactMessages,
  deleteContactMessage,
} = require("../controllers/contactController");

// Define the route for contacting us
router.post("/", createContactMessage);
// Post contact message
router.get("/", getAllContactMessages);

// Export the router
router.delete("/:id", deleteContactMessage);

module.exports = router;
