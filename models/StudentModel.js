const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    studentId: { type: String, unique: true, required: true }, // Unique student ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    }, // Reference to Class model
    specialSubject: { type: String, default: "" }, // Special subject field for classes 11 and 12
    password: { type: String, required: true },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    parentContact: {
      fatherName: String,
      motherName: String,
      fatherPhone: String,
      motherPhone: String,
      email: String,
    },
    dateOfEnrollment: {
      type: Date,
      default: Date.now,
    },
    guardianName: { type: String },
    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },
    finalStatus: {
      type: String,
      enum: ["Pass", "Fail", null], // Acceptable values: 'Pass', 'Fail', or null
      default: null,
    },
    aadhaarCardNumber: { type: String, required: true }, // Aadhaar card number
    samagraId: { type: String, required: true }, // Samagra ID
    bankDetails: {
      accountNumber: { type: String, required: true }, // Bank account number
      ifscNumber: { type: String, required: true }, // IFSC number
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
