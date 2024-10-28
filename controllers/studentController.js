const Student = require("../models/StudentModel");
const errorMessages = require("../utils/errorMessages");

// Helper function for sending error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(message, error);
  return res
    .status(statusCode)
    .json({ message, error: error ? error.message : undefined });
};

// Helper function to generate a unique student ID based on date of birth
function generateStudentId(dob) {
  const currentYear = new Date().getFullYear();
  const dobYear = new Date(dob).getFullYear();
  const lastTwoDigitsDobYear = dobYear.toString().slice(-2);
  const lastThreeDigitsTime = Date.now().toString().slice(-3);
  return `SVS${currentYear}R${lastTwoDigitsDobYear}${lastThreeDigitsTime}`;
}

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      dob,
      stream,
      className: studentClass,
      password,
      address,
      parentContact,
    } = req.body;

    if (!name || !email || !dob || !stream || !studentClass || !password) {
      return sendErrorResponse(res, 400, errorMessages.STUDENT.MISSING_FIELDS);
    }

    // Validate date of birth format
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobPattern.test(dob)) {
      return sendErrorResponse(
        res,
        400,
        errorMessages.STUDENT.INVALID_DATE_FORMAT
      );
    }

    // Check if email is already in use
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return sendErrorResponse(
        res,
        400,
        errorMessages.STUDENT.EMAIL_ALREADY_USED
      );
    }

    // Create a new student instance with a unique studentId
    const newStudent = new Student({
      studentId: generateStudentId(dob),
      name,
      email,
      dob,
      stream,
      className: studentClass,
      password,
      address,
      parentContact,
    });

    await newStudent.save();
    res.status(201).json({
      message: errorMessages.STUDENT.STUDENT_ADDED_SUCCESS,
      student: {
        id: newStudent._id,
        studentId: newStudent.studentId,
        name: newStudent.name,
        email: newStudent.email,
        dob: newStudent.dob,
        stream: newStudent.stream,
        className: newStudent.className,
        isActive: newStudent.isActive,
        address: newStudent.address,
        parentContact: newStudent.parentContact,
        dateOfEnrollment: newStudent.dateOfEnrollment,
        specialSubject: newStudent.specialSubject,
        image: newStudent.image,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      errorMessages.STUDENT.STUDENT_CREATION_FAILED,
      error
    );
  }
};

// Get all students with pagination
exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const students = await Student.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Student.countDocuments();
    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      students,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.STUDENT.GENERAL_ERROR, error);
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return sendErrorResponse(
        res,
        404,
        errorMessages.STUDENT.STUDENT_NOT_FOUND
      );
    }
    res.status(200).json(student);
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.STUDENT.GENERAL_ERROR, error);
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, dob, stream, password } = req.body;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return sendErrorResponse(
        res,
        404,
        errorMessages.STUDENT.STUDENT_NOT_FOUND
      );
    }

    if (email) {
      const existingStudent = await Student.findOne({
        email,
        _id: { $ne: id },
      });
      if (existingStudent) {
        return sendErrorResponse(
          res,
          400,
          errorMessages.STUDENT.EMAIL_ALREADY_USED
        );
      }
    }

    if (dob && !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      return sendErrorResponse(
        res,
        400,
        errorMessages.STUDENT.INVALID_DATE_FORMAT
      );
    }

    // Update fields if provided
    student.name = name || student.name;
    student.email = email || student.email;
    student.dob = dob || student.dob;
    student.stream = stream || student.stream;
    student.password = password || student.password;

    if (req.file) {
      student.image = req.file.path;
    }

    await student.save();
    res.status(200).json({
      message: errorMessages.STUDENT.STUDENT_UPDATED_SUCCESS,
      student,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      errorMessages.STUDENT.STUDENT_UPDATE_FAILED,
      error
    );
  }
};

// Soft delete a student by setting isActive to false
exports.inActiveStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return sendErrorResponse(
        res,
        404,
        errorMessages.STUDENT.STUDENT_NOT_FOUND
      );
    }
    student.isActive = false;
    await student.save();
    res.status(200).json({
      message: errorMessages.STUDENT.STUDENT_DELETED_SUCCESS,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.STUDENT.GENERAL_ERROR, error);
  }
};

// Permanently delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
      return sendErrorResponse(
        res,
        400,
        errorMessages.STUDENT.INVALID_ID_FORMAT
      );
    }
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return sendErrorResponse(
        res,
        404,
        errorMessages.STUDENT.STUDENT_NOT_FOUND
      );
    }
    res.status(200).json({
      message: errorMessages.STUDENT.STUDENT_DELETED_SUCCESS,
      deletedStudent,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.STUDENT.GENERAL_ERROR, error);
  }
};
