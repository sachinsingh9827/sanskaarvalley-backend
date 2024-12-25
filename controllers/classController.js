const Class = require("../models/ClassModel");
const ERRORS = require("../utils/errorMessages").CLASS; // Assuming your error messages are in a config file

// Create a new class
exports.createClass = async (req, res) => {
  console.log(req.body);

  try {
    const { className, section, roomNumber, timing, mainSubject, subjects } =
      req.body;

    // Validate required fields
    if (!className) {
      return res.status(400).json({ message: ERRORS.MISSING_NAME });
    }

    if (!roomNumber) {
      return res.status(400).json({ message: ERRORS.MISSING_ROOM_NUMBER });
    }

    if (!timing) {
      return res.status(400).json({ message: ERRORS.MISSING_TIMING });
    }

    if (!subjects || subjects.length === 0) {
      return res.status(400).json({ message: ERRORS.SUBJECTS_REQUIRED });
    }

    // Check specific condition for higher classes
    if (
      (className === "11" || className === "12") &&
      (!mainSubject || mainSubject.length === 0)
    ) {
      return res.status(400).json({ message: ERRORS.MAIN_SUBJECTS_REQUIRED });
    }

    // Create new class object with all fields
    const newClass = new Class({
      className,
      section: section || "A", // Default to "A" if not provided
      roomNumber,
      timing,
      mainSubject: mainSubject || [], // Default to an empty array
      subjects,
    });

    await newClass.save();

    res.status(201).json({
      message: ERRORS.CLASS_ADDED_SUCCESS,
      class: newClass,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: ERRORS.CLASS_CREATION_FAILED, error: error.message });
  }
};

// Assuming you have an error messages file

exports.getAllClasses = async (req, res) => {
  try {
    // Fetch all classes and populate the subject names
    const classes = await Class.find()
      .populate("subjects", "name") // Populate 'subjects' field with 'name' of subjects
      .exec();

    if (classes.length === 0) {
      return res.status(404).json({ message: ERRORS.NOT_FOUND });
    }

    // Return the classes with populated subject names
    res.status(200).json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: ERRORS.CLASS_FETCH_FAILED, error: error.message });
  }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: ERRORS.NOT_FOUND });
    }
    res.status(200).json(classData);
  } catch (error) {
    res
      .status(500)
      .json({ message: ERRORS.FETCH_FAILED, error: error.message });
  }
};

// Update a class by ID
exports.updateClass = async (req, res) => {
  try {
    const { className, roomNumber, timing, subjects, mainSubject } = req.body;

    // Validate required fields if they are being updated
    if (className === "") {
      return res.status(400).json({ message: ERRORS.MISSING_NAME });
    }

    if (roomNumber === "") {
      return res.status(400).json({ message: ERRORS.MISSING_ROOM_NUMBER });
    }

    if (timing === "") {
      return res.status(400).json({ message: ERRORS.MISSING_TIMING });
    }

    if (subjects && subjects.length === 0) {
      return res.status(400).json({ message: ERRORS.SUBJECTS_REQUIRED });
    }

    if (
      (className === "11" || className === "12") &&
      mainSubject &&
      mainSubject.length === 0
    ) {
      return res.status(400).json({ message: ERRORS.MAIN_SUBJECTS_REQUIRED });
    }

    // Perform the update
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: ERRORS.NOT_FOUND });
    }

    res.status(200).json({
      message: ERRORS.CLASS_UPDATED_SUCCESS,
      class: updatedClass,
    });
  } catch (error) {
    res.status(400).json({
      message: ERRORS.CLASS_UPDATE_FAILED,
      error: error.message,
    });
  }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: ERRORS.NOT_FOUND });
    }
    res.status(200).json({ message: ERRORS.DELETED_SUCCESS });
  } catch (error) {
    res
      .status(500)
      .json({ message: ERRORS.DELETE_FAILED, error: error.message });
  }
};

// Toggle active/deactive status of a class
exports.toggleClassStatus = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: ERRORS.NOT_FOUND });
    }

    classData.isActive = !classData.isActive; // Toggle the status
    await classData.save();

    const statusMessage = classData.isActive
      ? ERRORS.CLASS_ACTIVATED_SUCCESS
      : ERRORS.CLASS_DEACTIVATED_SUCCESS;

    res.status(200).json({ message: statusMessage, class: classData });
  } catch (error) {
    res.status(400).json({
      message: ERRORS.CLASS_DEACTIVATION_FAILED,
      error: error.message,
    });
  }
};

// Promote all students in a class to the next class
exports.promoteStudents = async (req, res) => {
  try {
    const { currentClassId, nextClassId } = req.body;

    if (!currentClassId || !nextClassId) {
      return res
        .status(400)
        .json({ message: ERRORS.MISSING_PROMOTION_DETAILS });
    }

    const currentClass = await Class.findById(currentClassId);
    const nextClass = await Class.findById(nextClassId);

    if (!currentClass || !nextClass) {
      return res.status(404).json({ message: ERRORS.NOT_FOUND });
    }

    currentClass.promotionEligible = true; // Mark as eligible for promotion
    currentClass.promotedTo = nextClassId;

    await currentClass.save();

    res.status(200).json({
      message: ERRORS.CLASS_PROMOTED_SUCCESS,
      class: currentClass,
    });
  } catch (error) {
    res.status(400).json({
      message: ERRORS.CLASS_PROMOTION_FAILED,
      error: error.message,
    });
  }
};
exports.getActiveClasses = async (req, res) => {
  try {
    // Find all classes where `isActive` is true
    const activeClasses = await Class.find({ isActive: true });

    if (activeClasses.length === 0) {
      return res.status(404).json({ message: ERRORS.NO_ACTIVE_CLASSES_FOUND });
    }

    res.status(200).json({
      message: ERRORS.ACTIVE_CLASSES_FETCH_SUCCESS,
      classes: activeClasses,
    });
  } catch (error) {
    res.status(500).json({
      message: ERRORS.ACTIVE_CLASSES_FETCH_FAILED,
      error: error.message,
    });
  }
};
