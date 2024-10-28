const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    studentId: { type: String, unique: true }, // Unique student ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    }, // Reference to Class model
    specialSubject: { type: String }, // Special subject field for classes 11 and 12
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
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
