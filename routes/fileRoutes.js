const express = require("express");
const upload = require("../middlewares/upload");
const { uploadFile } = require("../controllers/fileController");

const router = express.Router();

// Route for file upload
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
