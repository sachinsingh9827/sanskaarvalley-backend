const express = require("express");
const {
  createFAQ,
  getAllFAQs,
  getActiveFAQs,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

const router = express.Router();

router.post("/", createFAQ); // Create a new FAQ
router.get("/", getAllFAQs); // Get all FAQs
router.get("/active", getActiveFAQs); // Get active FAQs
router.put("/:id", updateFAQ); // Update an FAQ
router.delete("/:id", deleteFAQ); // Delete an FAQ

module.exports = router;
