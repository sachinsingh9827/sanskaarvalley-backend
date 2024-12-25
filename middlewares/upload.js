const multer = require("multer");

// Disk storage for uploading images
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving image to uploads/ directory");
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    console.log("Generating unique image file name");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Unique file name for image
  },
});
const uploadImage = multer({ storage: diskStorage });

// Disk storage for uploading resumes (optional - different destination or other logic)
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving resume to uploads/ directory");
    cb(null, "uploads/"); // Directory where resumes will be stored
  },
  filename: (req, file, cb) => {
    console.log("Generating unique resume file name");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Unique file name for resume
  },
});
const uploadResume = multer({ storage: resumeStorage });

module.exports = { uploadImage, uploadResume };
