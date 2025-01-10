const Teacher = require("../models/TeacherModel");
const errorMessages = require("../utils/errorMessages"); // Import error messages

// Generate a unique employee ID
const generateEmployeeId = () => {
  return "EMP-" + Math.floor(Math.random() * 1000000);
};

// Check if the generated employee ID already exists
const checkEmployeeIdUnique = async (employeeId) => {
  const existingTeacher = await Teacher.findOne({ employeeId });
  return existingTeacher ? true : false;
};

// Create teacher
exports.createTeacher = async (req, res) => {
  try {
    const { email, subjectsTaught, class: classId } = req.body;

    // Check for existing teacher email
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({
        message: "Email already in use. Please use a different email.",
      });
    }

    // Validate class ID
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(400).json({ message: "Invalid class ID provided." });
    }

    // Generate unique employee ID
    let employeeId = generateEmployeeId();
    let isEmployeeIdTaken = await checkEmployeeIdUnique(employeeId);

    while (isEmployeeIdTaken) {
      employeeId = generateEmployeeId();
      isEmployeeIdTaken = await checkEmployeeIdUnique(employeeId);
    }

    if (isEmployeeIdTaken) {
      return res.status(400).json({
        message: "Failed to generate a unique employee ID. Please try again.",
      });
    }

    // Create teacher
    const teacher = new Teacher({
      ...req.body,
      employeeId,
    });

    await teacher.save();

    return res.status(201).json({
      message: "Teacher added successfully.",
      teacher,
    });
  } catch (err) {
    console.error("Error in createTeacher:", err.message, err.stack);
    return res.status(500).json({
      message: `An error occurred: ${err.message}`, // Include error details
    });
  }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    return res.status(200).json(teachers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: errorMessages.TEACHER.GENERAL_ERROR,
    });
  }
};

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({
        message: errorMessages.TEACHER.TEACHER_NOT_FOUND,
      });
    }
    return res.status(200).json(teacher);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: errorMessages.TEACHER.GENERAL_ERROR,
    });
  }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({
        message: errorMessages.TEACHER.TEACHER_NOT_FOUND,
      });
    }
    return res.status(200).json({
      message: errorMessages.TEACHER.TEACHER_UPDATED_SUCCESS,
      teacher: updatedTeacher,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: errorMessages.TEACHER.GENERAL_ERROR,
    });
  }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({
        message: errorMessages.TEACHER.TEACHER_NOT_FOUND,
      });
    }
    return res.status(200).json({
      message: errorMessages.TEACHER.TEACHER_DELETED_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: errorMessages.TEACHER.GENERAL_ERROR,
    });
  }
};

// Activate/Deactivate teacher
exports.toggleTeacherStatus = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({
        message: errorMessages.TEACHER.TEACHER_NOT_FOUND,
      });
    }
    res.status(200).json({
      message: `Teacher status updated successfully.`,
      teacher: updatedTeacher,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: errorMessages.TEACHER.GENERAL_ERROR,
    });
  }
};
