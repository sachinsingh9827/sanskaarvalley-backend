const Subject = require("../models/SubjectModel");
const errorMessages = require("../utils/errorMessages");

// Create a new subject
exports.addSubject = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    // Validate required fields
    if (!name) {
      return res
        .status(400)
        .json({ message: errorMessages.SUBJECT.MISSING_FIELDS });
    }

    // Create a new subject instance
    const newSubject = new Subject({
      name,
      isActive: isActive !== undefined ? isActive : true, // Use provided value or default to true
    });

    // Save the subject to the database
    await newSubject.save();

    res.status(201).json({
      message: errorMessages.SUBJECT.SUBJECT_ADDED_SUCCESS,
      subject: newSubject,
    });
  } catch (error) {
    console.error("Subject Creation Error:", error);
    res.status(500).json({
      message: errorMessages.SUBJECT.SUBJECT_CREATION_FAILED,
      error: error.message,
    });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json({
      subjects,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({
      message: errorMessages.SUBJECT.SUBJECT_FETCH_FAILED,
      error: error.message,
    });
  }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND });
    }

    // Set isActive to false to deactivate
    subject.isActive = false;
    await subject.save();

    res.status(200).json({
      message: errorMessages.SUBJECT.SUBJECT_DEACTIVATED_SUCCESS,
      subject,
    });
  } catch (error) {
    console.error("Subject Deactivation Error:", error);
    res.status(500).json({
      message: errorMessages.SUBJECT.SUBJECT_DEACTIVATION_FAILED,
      error: error.message,
    });
  }
};
exports.deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the subject by ID
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) {
      return res.status(404).json({
        message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND, // Example error message
      });
    }

    res.status(200).json({
      message: errorMessages.SUBJECT.SUBJECT_DELETED_SUCCESS, // Example success message
    });
  } catch (error) {
    console.error("Subject Deletion Error:", error);
    res.status(500).json({
      message: errorMessages.SUBJECT.SUBJECT_DELETION_FAILED, // Example failure message
      error: error.message,
    });
  }
};
