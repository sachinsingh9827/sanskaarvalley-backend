const Student = require("../models/StudentModel");
const errorMessages = require("../utils/errorMessages");
const bcrypt = require("bcrypt");

// Helper function for sending error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(message, error);
  return res
    .status(statusCode)
    .json({ message, error: error ? error.message : undefined });
};

// Helper function to generate a unique student ID
function generateStudentId(dob, stream, studentClass) {
  const currentYear = new Date().getFullYear();
  const dobYear = new Date(dob).getFullYear();
  const lastTwoDigitsDobYear = dobYear.toString().slice(-2);
  const streamCode = stream.slice(0, 3).toUpperCase(); // Example: "Science" -> "SCI"
  const classCode = studentClass.replace(/\s+/g, "").toUpperCase(); // Example: "10 A" -> "10A"
  const randomDigits = Date.now().toString().slice(-4);
  return `SVS${currentYear}${streamCode}${classCode}${lastTwoDigitsDobYear}${randomDigits}`;
}

// Helper function to generate a password
function generatePassword(dob, name) {
  const dobYear = new Date(dob).getFullYear();
  const studentName = name.slice(0, 3).toUpperCase();
  return `${studentName}${dobYear}`;
}

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      dob,
      stream,
      classId, // Use classId instead of className
      address,
      parentContact,
      specialSubject,
      aadhaarCardNumber,
      samagraId,
      bankDetails,
    } = req.body;

    // Parse JSON strings into objects
    const parsedAddress = JSON.parse(address);
    const parsedParentContact = JSON.parse(parentContact);
    const parsedBankDetails = JSON.parse(bankDetails);
    const parsedEmergencyContact = JSON.parse(req.body.emergencyContact); // Assuming you want to use this too

    // Check for required fields
    if (
      !name ||
      !email ||
      !dob ||
      !stream ||
      !classId || // Check for classId
      !aadhaarCardNumber ||
      !samagraId ||
      !parsedBankDetails?.accountNumber ||
      !parsedBankDetails?.ifscNumber
    ) {
      console.log("Missing fields:", {
        name,
        email,
        dob,
        stream,
        classId,
        aadhaarCardNumber,
        samagraId,
        accountNumber: parsedBankDetails?.accountNumber,
        ifscNumber: parsedBankDetails?.ifscNumber,
      });
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

    // Check if email or Aadhaar number is already in use
    const existingStudent = await Student.findOne({
      $or: [{ email }, { aadhaarCardNumber }],
    });
    if (existingStudent) {
      return sendErrorResponse(
        res,
        400,
        errorMessages.STUDENT.EMAIL_OR_AADHAAR_ALREADY_USED
      );
    }

    // Generate unique student ID and password (implement these functions as needed)
    const studentId = generateStudentId(dob, stream, classId); // Use classId here
    const password = generatePassword(dob, name);

    // Create and save a new student
    const newStudent = new Student({
      studentId,
      name,
      email,
      dob,
      classId, // Use classId instead of className
      specialSubject,
      password,
      address: parsedAddress, // Use parsed address
      parentContact: parsedParentContact, // Use parsed parent contact
      aadhaarCardNumber,
      samagraId,
      bankDetails: parsedBankDetails, // Use parsed bank details
      image: req.file ? req.file.path : "", // Save the image path
    });

    await newStudent.save();
    res.status(201).json({
      message: errorMessages.STUDENT.STUDENT_ADDED_SUCCESS,
      student: newStudent,
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

// Update a student's details
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    dob,
    stream,
    className,
    password,
    specialSubject,
    aadhaarCardNumber,
    samagraId,
    bankDetails,
  } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return sendErrorResponse(
        res,
        404,
        errorMessages.STUDENT.STUDENT_NOT_FOUND
      );
    }

    // Check for conflicting email or Aadhaar number
    if (email || aadhaarCardNumber) {
      const existingStudent = await Student.findOne({
        $or: [{ email }, { aadhaarCardNumber }],
        _id: { $ne: id },
      });
      if (existingStudent) {
        return sendErrorResponse(
          res,
          400,
          errorMessages.STUDENT.EMAIL_OR_AADHAAR_ALREADY_USED
        );
      }
    }

    // Update student details
    student.name = name || student.name;
    student.email = email || student.email;
    student.dob = dob || student.dob;
    student.stream = stream || student.stream;
    student.className = className || student.className;
    student.password = password || student.password;
    student.specialSubject = specialSubject || student.specialSubject;
    student.aadhaarCardNumber = aadhaarCardNumber || student.aadhaarCardNumber;
    student.samagraId = samagraId || student.samagraId;
    student.bankDetails = bankDetails || student.bankDetails;

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

// Soft delete a student (set isActive to false)
exports.inActivateStudent = async (req, res) => {
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
// Reactivate a student
exports.reActivateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return sendErrorResponse(
        res,
        404,
        errorMessages.STUDENT.STUDENT_NOT_FOUND
      );
    }
    student.isActive = true;
    await student.save();
    res.status(200).json({
      message: errorMessages.STUDENT.STUDENT_REACTIVATED_SUCCESS,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.STUDENT.GENERAL_ERROR, error);
  }
};

// Get all students (with pagination and search)
const path = require("path");

exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", stream, className } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ message: "Invalid page number." });
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({ message: "Invalid limit number." });
    }

    const query = {
      $and: [
        search
          ? {
              $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { studentId: { $regex: search, $options: "i" } },
              ],
            }
          : {},
        stream ? { stream } : {},
        className ? { className } : {},
      ],
    };

    const students = await Student.find(query)
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber)
      .exec();

    const count = await Student.countDocuments(query);

    // Add full image URL for each student
    const updatedStudents = students.map((student) => ({
      ...student.toObject(),
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${student.image}`,
    }));

    res.status(200).json({
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
      students: updatedStudents,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      message: "An error occurred while fetching students.",
      error: error.message,
    });
  }
};

// Get a single student by ID
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
// Permanently delete a student
exports.deleteStudentPermanently = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return sendErrorResponse(
        res,
        404,
        errorMessages.STUDENT.STUDENT_NOT_FOUND
      );
    }
    res.status(200).json({
      message: errorMessages.STUDENT.STUDENT_DELETED_PERMANENTLY,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.STUDENT.GENERAL_ERROR, error);
  }
};
