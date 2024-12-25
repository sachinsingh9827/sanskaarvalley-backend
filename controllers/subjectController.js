const Subject = require("../models/SubjectModel");
const paginate = require("../utils/paginate");
const errorMessages = require("../utils/errorMessages");

const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check for missing fields
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required." });
    }

    // If you need to auto-generate `code` here:
    const code = `${name.slice(0, 3).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const newSubject = new Subject({
      name,
      description,
      code,
    });

    await newSubject.save();
    res.status(201).json({
      message: "Subject added successfully",
      data: newSubject,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the subject." });
  }
};

const getSubjects = async (req, res) => {
  try {
    const { skip, limit, sort } = paginate(req.query);
    const totalSubjects = await Subject.countDocuments();
    const subjects = await Subject.find().skip(skip).limit(limit).sort(sort);

    const result = {
      currentPage: req.query.page || 1,
      totalPages: Math.ceil(totalSubjects / limit),
      subjects,
    };

    return res.status(200).json({
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      subjects: result.subjects,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_FETCH_FAILED });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description, isActive } = req.body;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND });
    }

    subject.name = name || subject.name;
    subject.code = code || subject.code;
    subject.description = description || subject.description;
    subject.isActive = isActive !== undefined ? isActive : subject.isActive;

    await subject.save();
    res.status(200).json({
      message: errorMessages.SUBJECT.SUBJECT_ADDED_SUCCESS,
      data: subject,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_CREATION_FAILED });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the subject exists
    const subject = await Subject.findById(id);
    if (!subject) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND });
    }

    // Delete the subject
    await Subject.findByIdAndDelete(id); // Use the model directly with the id
    res
      .status(200)
      .json({ message: errorMessages.SUBJECT.SUBJECT_DELETED_SUCCESS });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_DELETION_FAILED });
  }
};

const toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the subject by ID
    const subject = await Subject.findById(id);
    if (!subject) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.SUBJECT_NOT_FOUND });
    }

    // Toggle the isActive field
    subject.isActive = !subject.isActive;
    await subject.save();

    res.status(200).json({
      message: `Subject is now ${subject.isActive ? "active" : "inactive"}.`,
      data: subject,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_CREATION_FAILED });
  }
};
const getActiveSubjects = async (req, res) => {
  try {
    const activeSubjects = await Subject.find({ isActive: true });

    if (activeSubjects.length === 0) {
      return res
        .status(404)
        .json({ message: errorMessages.SUBJECT.NO_ACTIVE_SUBJECTS });
    }

    res.status(200).json({
      message: errorMessages.SUBJECT.ACTIVE_SUBJECTS_FETCHED,
      data: activeSubjects,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: errorMessages.SUBJECT.SUBJECT_FETCH_FAILED });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  toggleActiveStatus, // Export the new function
  getActiveSubjects,
};
