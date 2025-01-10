const express = require("express");
const multer = require("multer");
const path = require("path");
const CareerApplication = require("../models/careerApplicationModel");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes"); // Folder to store uploaded resumes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|docx/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only .pdf, .doc, and .docx files are allowed!"));
    }
  },
});

// POST Route to Submit Career Application
router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, mobile, coverLetter, position } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !req.file) {
      return res.status(400).json({
        message: "All required fields must be provided, including resume.",
      });
    }

    // Create a new application entry
    const application = new CareerApplication({
      name,
      email,
      mobile,
      resume: req.file.path, // Save file path
      coverLetter,
      position,
    });

    await application.save();
    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting application", error: error.message });
  }
});

// GET Route to Fetch All Applications (Optional, as an example)
router.get("/", async (req, res) => {
  try {
    const applications = await CareerApplication.find().sort({ createdAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching applications", error: error.message });
  }
});

module.exports = router;
