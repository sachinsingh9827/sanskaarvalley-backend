// routes/contactRoutes.js
const express = require("express");
const {
  createContact,
  updateContact,
  deleteContact,
  getContact,
} = require("../controllers/contact");

const router = express.Router();

// Create a new contact
router.post("/add", createContact);

// Update an existing contact by id
router.put("/contact/:id", updateContact);

// Delete a contact by id
router.delete("/contact/:id", deleteContact);

// Export the router
router.get("/get", getContact);

module.exports = router;
