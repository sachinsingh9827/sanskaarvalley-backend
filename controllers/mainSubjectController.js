const MainSubject = require("../models/mainSubjectModel");
const errorMessages = require("../utils/errorMessages");

// Create a new main subject
const createMainSubject = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: errorMessages.CLASS.MISSING_NAME });
    }

    const mainSubject = new MainSubject({
      name,
      description,
      isActive,
    });
    await mainSubject.save();

    res.status(201).json({
      message: errorMessages.SUBJECT.SUBJECT_ADDED_SUCCESS,
      mainSubject,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_CREATION_FAILED });
  }
};

// Get all main subjects
const getAllMainSubjects = async (req, res) => {
  try {
    const mainSubjects = await MainSubject.find();
    res.status(200).json(mainSubjects);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_FETCH_FAILED });
  }
};

// Get only active main subjects
const getActiveMainSubjects = async (req, res) => {
  try {
    const activeSubjects = await MainSubject.find({ isActive: true });
    res.status(200).json({
      message: errorMessages.SUBJECT.ACTIVE_SUBJECTS_FETCHED_SUCCESS,
      activeSubjects,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_FETCH_FAILED });
  }
};

// Toggle active status
const toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const mainSubject = await MainSubject.findById(id);
    if (!mainSubject) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND });
    }

    mainSubject.isActive = !mainSubject.isActive; // Toggle the status
    await mainSubject.save();

    res.status(200).json({
      message: errorMessages.SUBJECT.UPDATED_SUCCESS,
      mainSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: errorMessages.GENERAL.GENERAL_ERROR });
  }
};

// Get a single main subject by ID
const getMainSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const mainSubject = await MainSubject.findById(id);

    if (!mainSubject) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND });
    }

    res.status(200).json(mainSubject);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_FETCH_FAILED });
  }
};

// Update a main subject
const updateMainSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
    const mainSubject = await MainSubject.findByIdAndUpdate(
      id,
      { name, description, isActive },
      { new: true } // Return the updated document
    );

    if (!mainSubject) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND });
    }

    res.status(200).json({
      message: errorMessages.SUBJECT.UPDATED_SUCCESS,
      mainSubject,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_CREATION_FAILED });
  }
};

// Delete a main subject
const deleteMainSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const mainSubject = await MainSubject.findByIdAndDelete(id);

    if (!mainSubject) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND });
    }

    res
      .status(200)
      .json({ message: errorMessages.SUBJECT.SUBJECT_DELETED_SUCCESS });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_DELETION_FAILED });
  }
};

module.exports = {
  createMainSubject,
  getAllMainSubjects,
  getActiveMainSubjects,
  toggleActiveStatus,
  getMainSubject,
  updateMainSubject,
  deleteMainSubject,
};
