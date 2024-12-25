const mongoose = require("mongoose");

// Define the teacher schema
const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Please fill a valid email address.",
      ], // Email validation
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number."], // Phone number validation
    },
    aadhaarNumber: {
      type: String,
      required: [true, "Aadhaar number is required."],
      match: [/^\d{12}$/, "Aadhaar number should be a 12-digit number."], // Aadhaar number validation
    },
    accountDetails: {
      bankName: {
        type: String,
        required: false, // Optional field
      },
      accountNumber: {
        type: String,
        required: false, // Optional field
      },
      ifscCode: {
        type: String,
        required: false, // Optional field
      },
    },
    subjectsTaught: {
      type: [String],
      default: [], // Default empty array if no subjects are provided
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class", // Reference to Class model
      required: [true, "Class is required."],
    },
    employeeId: {
      type: String,
      unique: true,
      required: [true, "Employee ID is required."],
    },
    isActive: {
      type: Boolean,
      default: true, // Default value set to true
    },
    image: {
      type: String,
      required: false, // Optional field
      validate: {
        validator: function (value) {
          // Validate if image URL is in a valid format
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i.test(value);
        },
        message: "Please provide a valid image URL.",
      },
    },
  },
  { timestamps: true }
); // Add timestamps for creation and modification times

// Create and export the Teacher model
const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
