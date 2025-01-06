const multer = require("multer");
const path = require("path");

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/"); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Unique filename
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

// Export the upload instance
module.exports = upload;
