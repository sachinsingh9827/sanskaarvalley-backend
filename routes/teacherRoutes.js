const express = require("express");
const teacherController = require("../controllers/teacherController"); // Import controller
const router = express.Router();
const {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  toggleTeacherStatus,
} = require("../controllers/teacherController");
// Route for creating a teacher
router.post("/", createTeacher);

// Route for getting all teachers
router.get("/teachers", getAllTeachers);

// Route for getting teacher by ID
router.get("/teachers/:id", getTeacherById);

// Route for updating teacher information
router.put("/teachers/:id", updateTeacher);

// Route for deleting a teacher
router.delete("/teachers/:id", deleteTeacher);

// Route for activating or deactivating a teacher
router.patch("/teachers/:id/activate", toggleTeacherStatus);

module.exports = router;
