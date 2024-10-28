const Class = require("../models/ClassModel"); // Import your Class model
const errorMessages = require("../utils/errorMessages");

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const { name, section, isActive, mainSubject, subjects } = req.body;

    // Validate required fields
    if (!name || !section) {
      return res
        .status(400)
        .json({ message: errorMessages.CLASS.MISSING_FIELDS });
    }

    // Create a new class instance
    const newClass = new Class({
      name,
      section,
      isActive: isActive !== undefined ? isActive : true, // Use provided value or default to true
      mainSubject: mainSubject || "", // Use provided value or default to empty string
      subjects: subjects || [], // Use provided subjects or default to empty array
    });

    // Save the class to the database
    await newClass.save();

    res.status(201).json({
      message: errorMessages.CLASS.CLASS_ADDED_SUCCESS,
      class: newClass,
    });
  } catch (error) {
    console.error("Class Creation Error:", error);
    res.status(500).json({
      message: errorMessages.CLASS.CLASS_CREATION_FAILED,
      error: error.message,
    });
  }
};

// Get all classes with pagination
exports.getAllClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const classes = await Class.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Class.countDocuments();

    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      classes,
    });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({
      message: errorMessages.CLASS.CLASS_FETCH_FAILED,
      error: error.message,
    });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, section, isActive, mainSubject, subjects } = req.body;

  try {
    const updatedClass = await Class.findById(id);
    if (!updatedClass) {
      return res
        .status(404)
        .json({ message: errorMessages.CLASS.CLASS_NOT_FOUND });
    }

    // Update fields only if provided
    updatedClass.name = name || updatedClass.name;
    updatedClass.section = section || updatedClass.section;
    updatedClass.isActive =
      isActive !== undefined ? isActive : updatedClass.isActive;
    updatedClass.mainSubject = mainSubject || updatedClass.mainSubject;
    updatedClass.subjects = subjects || updatedClass.subjects;

    // Save the updated class document
    await updatedClass.save();

    res.status(200).json({
      message: errorMessages.CLASS.CLASS_UPDATED_SUCCESS,
      class: updatedClass,
    });
  } catch (error) {
    console.error("Class Update Error:", error);
    res.status(500).json({
      message: errorMessages.CLASS.CLASS_UPDATE_FAILED,
      error: error.message,
    });
  }
};

// Deactivate a class
exports.deactivateClass = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedClass = await Class.findById(id);
    if (!updatedClass) {
      return res
        .status(404)
        .json({ message: errorMessages.CLASS.CLASS_NOT_FOUND });
    }

    // Set isActive to false
    updatedClass.isActive = false;
    await updatedClass.save();

    res.status(200).json({
      message: errorMessages.CLASS.CLASS_DEACTIVATED_SUCCESS,
      class: updatedClass,
    });
  } catch (error) {
    console.error("Class Deactivation Error:", error);
    res.status(500).json({
      message: errorMessages.CLASS.CLASS_DEACTIVATION_FAILED,
      error: error.message,
    });
  }
};
