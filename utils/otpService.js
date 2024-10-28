const nodemailer = require("nodemailer");

// Temporary in-memory store for OTPs
let otpStore = {};

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via email
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email service
    auth: {
      user: process.env.NODEMAILER_USERNAME, // Your email address
      pass: process.env.NODEMAILER_PASSWORD, // Your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: email, // List of receivers
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email:", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

// Function to create and send OTP
const createAndSendOtp = async (email) => {
  const otp = generateOTP(); // Generate OTP
  otpStore[email] = { otp, expires: Date.now() + 300000 }; // Store OTP with 5 minutes expiration
  await sendOTP(email, otp); // Send OTP to the provided email
};

// Function to verify OTP
const verifyOTP = (email, otp) => {
  const record = otpStore[email];
  if (!record) return false; // No OTP stored for this email
  if (Date.now() > record.expires) {
    delete otpStore[email]; // OTP expired, remove it
    return false;
  }
  if (record.otp === otp) {
    delete otpStore[email]; // OTP verified, remove it
    return true;
  }
  return false; // OTP does not match
};

// Export the functions
module.exports = { generateOTP, sendOTP, createAndSendOtp, verifyOTP };
