const Admin = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createAndSendOtp, verifyOTP } = require("../utils/otpService");
const errorMessages = require("../utils/errorMessages"); // Import the error messages

// Helper function for sending error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(message, error);
  return res
    .status(statusCode)
    .json({ message, error: error ? error.message : undefined });
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, mobileNumber, password, role = "admin" } = req.body;

    // Validate required fields
    if (!name || !email || !password || !mobileNumber) {
      return sendErrorResponse(res, 400, errorMessages.ADMIN.MISSING_FIELDS);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return sendErrorResponse(res, 400, errorMessages.ADMIN.ADMIN_EXISTS);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const newAdmin = new Admin({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      role,
      login: true, // Set login to true upon registration
    });

    // Save the admin to the database
    await newAdmin.save();

    // Create a token
    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: errorMessages.ADMIN.REGISTRATION_SUCCESS, // Use the success message from errorMessages
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        mobileNumber: newAdmin.mobileNumber,
        role: newAdmin.role,
        login: newAdmin.login,
      },
      token,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.ADMIN.GENERAL_ERROR, error);
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return sendErrorResponse(
        res,
        401,
        errorMessages.ADMIN.INVALID_CREDENTIALS
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return sendErrorResponse(
        res,
        401,
        errorMessages.ADMIN.INVALID_CREDENTIALS
      );
    }

    // Update login status
    admin.login = true; // Set login to true on successful login
    await admin.save();

    // Create a token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: errorMessages.ADMIN.LOGIN_SUCCESS, // Use the success message from errorMessages
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        mobileNumber: admin.mobileNumber,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.ADMIN.GENERAL_ERROR, error);
  }
};

exports.logoutAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return sendErrorResponse(res, 401, "Token is required.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return sendErrorResponse(res, 404, errorMessages.ADMIN.ADMIN_NOT_FOUND);
    }

    admin.login = false; // Set login to false on logout
    await admin.save();

    res.status(200).json({ message: errorMessages.ADMIN.LOGOUT_SUCCESS }); // Use the success message from errorMessages
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.ADMIN.GENERAL_ERROR, error);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return sendErrorResponse(res, 404, errorMessages.ADMIN.ADMIN_NOT_FOUND);
    }

    const otp = await createAndSendOtp(admin.email); // Call the function to send OTP

    admin.resetPasswordToken = otp;
    admin.resetTokenExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    await admin.save();

    // Use the success message from errorMessages
    res.status(200).json({ message: errorMessages.ADMIN.OTP_SENT_SUCCESS });
  } catch (error) {
    console.error("Error in forgot password:", error);
    sendErrorResponse(res, 500, errorMessages.ADMIN.GENERAL_ERROR, error);
  }
};

// New function to verify OTP and reset password
exports.verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return sendErrorResponse(res, 404, errorMessages.ADMIN.ADMIN_NOT_FOUND);
    }

    // Verify the OTP
    const isOtpValid = verifyOTP(email, otp);
    if (!isOtpValid) {
      return sendErrorResponse(res, 400, errorMessages.ADMIN.OTP_INVALID);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword; // Update the password
    admin.resetPasswordToken = undefined; // Clear the OTP
    admin.resetTokenExpiry = undefined; // Clear the expiration
    await admin.save();

    res
      .status(200)
      .json({ message: errorMessages.ADMIN.PASSWORD_RESET_SUCCESS });
  } catch (error) {
    sendErrorResponse(res, 500, errorMessages.ADMIN.GENERAL_ERROR, error);
  }
};
