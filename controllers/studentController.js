// controllers/studentController.js
const Student = require("../models/StudentModel");

const addStudent = async (req, res) => {
  try {
    const studentData = req.body;

    // Create a new student instance
    const student = new Student(studentData);

    // Save the student to the database
    await student.save();

    res.status(201).json({ message: "Student added successfully!", student });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(400).json({
      message: "Error registering student",
      error: error.message,
    });
  }
};

module.exports = {
  addStudent,
};
