const multer = require("multer");
const path = require("path");

// Disk storage for uploading images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving image to uploads/images/ directory");
    cb(null, "uploads/images/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    console.log("Generating unique image file name");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Unique file name for image
  },
});

// Disk storage for uploading resumes
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving resume to uploads/resumes/ directory");
    cb(null, "uploads/resumes/"); // Directory where resumes will be stored
  },
  filename: (req, file, cb) => {
    console.log("Generating unique resume file name");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Unique file name for resume
  },
});

// Middleware for uploading images
const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB for images
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed image formats
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File type not supported!"));
  },
});

// Middleware for uploading resumes
const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB for resumes
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/; // Allowed resume formats
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File type not supported!"));
  },
});

// Export the upload middlewares
module.exports = { uploadImage, uploadResume };
