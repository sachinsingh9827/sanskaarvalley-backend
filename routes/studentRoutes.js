const express = require("express");
const router = express.Router();
const {
  registerStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  inActiveStudent,
} = require("../controllers/studentController");
const checkLogoutTime = require("../middlewares/checkLogoutTime");
const upload = require("../middlewares/upload");

// Apply the middleware to all student routes
router.use(checkLogoutTime);

// Define routes
router.post("/register", registerStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);

// Update student route with image upload
router.put("/:id", upload.single("image"), updateStudent);

router.put("/:id", inActiveStudent);

module.exports = router;
