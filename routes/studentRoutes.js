const express = require("express");
const router = express.Router();
const {
  registerStudent,
  updateStudent,
  inActivateStudent,
  getAllStudents,
  reActivateStudent,
  deleteStudentPermanently,
  getStudentById,
} = require("../controllers/studentController");
const checkLogoutTime = require("../middlewares/checkLogoutTime");
const upload = require("../middlewares/upload");

// Apply the middleware to all student routes
router.use(checkLogoutTime);

// Define routes
router.post("/register", upload.single("image"), registerStudent);
router.get("/all-students", getAllStudents);

// Update student route with image upload
router.put("/:id", upload.single("image"), updateStudent);

router.put("/:id", inActivateStudent);
router.put("/reactivate/:id", reActivateStudent);
router.delete("/:id", deleteStudentPermanently);
router.get("/:id", getStudentById);

module.exports = router;
