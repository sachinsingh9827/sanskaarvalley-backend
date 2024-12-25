const express = require("express");
const teacherController = require("../controllers/teacherController"); // Import controller
const router = express.Router();

// Route for creating a teacher
router.post("/teachers", teacherController.createTeacher);

// Route for getting all teachers
router.get("/teachers", teacherController.getAllTeachers);

// Route for getting teacher by ID
router.get("/teachers/:id", teacherController.getTeacherById);

// Route for updating teacher information
router.put("/teachers/:id", teacherController.updateTeacher);

// Route for deleting a teacher
router.delete("/teachers/:id", teacherController.deleteTeacher);

// Route for activating or deactivating a teacher
router.patch("/teachers/:id/activate", teacherController.toggleTeacherStatus);

module.exports = router;
