const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  applyForCareer,
  getAllCareerApplications,
  getCareerApplicationById,
  deleteCareerApplication,
  changeApplicationStatus,
} = require("../controllers/careerController");

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
router.post("/apply", upload.single("resume"), applyForCareer);

// GET Route to Fetch All Applications
router.get("/", getAllCareerApplications);

// Other routes can be added here as needed

module.exports = router;
