const CareerApplication = require("../models/careerApplicationModel"); // Adjust the path as necessary

// Submit a new career application
const applyForCareer = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    // Destructure the required fields from the request body
    const { name, email, mobile, position, coverLetter } = req.body;

    // Check if a resume file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    // Get the date six months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Check for existing applications with the same email or mobile number within the last 6 months
    const existingApplication = await CareerApplication.findOne({
      $or: [
        { email, createdAt: { $gt: sixMonthsAgo } },
        { mobile, createdAt: { $gt: sixMonthsAgo } },
      ],
    });

    // If an existing application is found, return an error message
    if (existingApplication) {
      const appliedDate = existingApplication.createdAt.toDateString();
      const identifier =
        existingApplication.email === email ? "email" : "mobile number";
      return res.status(400).json({
        message: `You have already applied with this ${identifier} on ${appliedDate}. You can reapply after 6 months.`,
      });
    }

    // Create a new career application
    const application = new CareerApplication({
      name,
      email,
      mobile,
      position,
      coverLetter,
      resume: `/uploads/resumes/${req.file.filename}`, // Adjust the path based on your storage structure
    });

    // Save the application to the database
    await application.save();

    // Respond with a success message
    res.status(201).json({
      success: true,
      message: "Career application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit application.",
      error: error.message, // Include the error message for debugging
    });
  }
};

// Get all career applications with pagination
const getAllCareerApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const applications = await CareerApplication.find()
      .select(
        "name email mobile position createdAt resume coverLetter status updatedAt"
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalApplications = await CareerApplication.countDocuments();

    res.status(200).json({
      message: "Career applications fetched successfully.",
      applications,
      totalApplications,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalApplications / limit),
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      message: "Failed to fetch applications.",
      error: error.message,
    });
  }
};

// Get a single career application by ID
const getCareerApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await CareerApplication.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Career application not found." });
    }

    res.status(200).json({
      message: "Career application fetched successfully.",
      application,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({
      message: "Failed to fetch application.",
      error: error.message,
    });
  }
};

// Delete career applications (supports multiple deletions)
const deleteCareerApplication = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !ids.length) {
      return res
        .status(400)
        .json({ message: "No applications selected for deletion." });
    }

    const result = await CareerApplication.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No matching applications found to delete." });
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} applications deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete selected applications.",
      error: error.message,
    });
  }
};

// Change application status
const changeApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["Pending", "Reviewed", "Shortlisted", "Rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const application = await CareerApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Career application not found." });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update application status.",
      error: error.message,
    });
  }
};

module.exports = {
  applyForCareer,
  getAllCareerApplications,
  getCareerApplicationById,
  deleteCareerApplication,
  changeApplicationStatus,
};
