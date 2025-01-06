const express = require("express");
const {
  applyForCareer,
  getAllCareerApplications,
  getCareerApplicationById,
  deleteCareerApplication,
  changeApplicationStatus,
} = require("../controllers/careerController");
const upload = require("../middlewares/upload");

const router = express.Router();

// Apply for a career
// router.post("/", upload.uploadResume.single("resume"), applyForCareer);

// Get all career applications with pagination
router.get("/", getAllCareerApplications);

// Get a single career application by ID
router.get("/:id", getCareerApplicationById);

// Delete career applications (multiple deletion supported)
router.delete("/delete", deleteCareerApplication);

// Change the status of a career application
router.put("/status/:id", changeApplicationStatus);

// Add route for downloading resumes
router.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/resumes/${filename}`; // Ensure this path matches your storage structure
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).json({ message: "Failed to download the resume." });
    }
  });
});

module.exports = router;
