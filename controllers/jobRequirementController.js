const JobRequirement = require("../models/jobRequirementModel");

// Post a new job requirement
const createJobRequirement = async (req, res) => {
  try {
    const {
      title,
      description,
      qualifications,
      experience,
      location,
      isActive,
      closingDate,
    } = req.body;

    if (!title || !description || !qualifications || !closingDate) {
      return res.status(400).json({
        message:
          "Title, description, qualifications, and closing date are required fields.",
      });
    }

    const closingDateObj = new Date(closingDate);
    if (isNaN(closingDateObj)) {
      return res.status(400).json({ message: "Invalid closing date." });
    }

    const newJobRequirement = new JobRequirement({
      title,
      description,
      qualifications,
      experience,
      location,
      closingDate: closingDateObj,
      isActive,
    });

    const savedJob = await newJobRequirement.save();

    res.status(201).json({
      message: "Job requirement posted successfully.",
      job: savedJob,
    });
  } catch (error) {
    console.error("Error posting job requirement:", error);
    res.status(500).json({
      message: "Failed to post job requirement.",
      error: error.message,
    });
  }
};

// Get all job requirements
const getAllJobRequirements = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const jobs = await JobRequirement.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalJobs = await JobRequirement.countDocuments();

    res.status(200).json({
      message: "Job requirements fetched successfully.",
      jobs,
      totalJobs,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    console.error("Error fetching job requirements:", error);
    res.status(500).json({
      message: "Failed to fetch job requirements.",
      error: error.message,
    });
  }
};

// Get active job requirements
const getActiveJobRequirements = async (req, res) => {
  try {
    const activeJobs = await JobRequirement.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "Active job requirements fetched successfully.",
      jobs: activeJobs,
    });
  } catch (error) {
    console.error("Error fetching active job requirements:", error);
    res.status(500).json({
      message: "Failed to fetch active job requirements.",
      error: error.message,
    });
  }
};

// Delete a job requirement
const deleteJobRequirement = async (req, res) => {
  try {
    const { id } = req.params; // For single ID deletion
    const { ids } = req.body; // For multiple ID deletion

    // Check if both single ID and array of IDs are not provided
    if (!id && (!Array.isArray(ids) || ids.length === 0)) {
      return res.status(400).json({
        message: "Please provide a valid ID or an array of IDs to delete.",
      });
    }

    // Single ID deletion
    if (id) {
      const deletedJob = await JobRequirement.findByIdAndDelete(id);

      if (!deletedJob) {
        return res.status(404).json({ message: "Job requirement not found." });
      }

      return res.status(200).json({
        message: "Job requirement deleted successfully.",
        job: deletedJob,
      });
    }

    // Multiple ID deletion
    if (Array.isArray(ids)) {
      const result = await JobRequirement.deleteMany({ _id: { $in: ids } });

      return res.status(200).json({
        message: `${result.deletedCount} job requirements deleted successfully.`,
      });
    }
  } catch (error) {
    console.error("Error deleting job requirement(s):", error);
    res.status(500).json({
      message: "Failed to delete job requirement(s).",
      error: error.message,
    });
  }
};

// Update a job requirement
const updateJobRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate input
    if (!id) {
      return res
        .status(400)
        .json({ message: "Job ID is required for update." });
    }

    // Update the job requirement
    const updatedJob = await JobRequirement.findByIdAndUpdate(
      id,
      { $set: updates }, // Apply updates
      { new: true, runValidators: true } // Return the updated document and validate the updates
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job requirement not found." });
    }

    res.status(200).json({
      message: "Job requirement updated successfully.",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job requirement:", error);
    res.status(500).json({
      message: "Failed to update job requirement.",
      error: error.message,
    });
  }
};

// Deactivate a job requirement
const toggleJobRequirementStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the job by ID
    const job = await JobRequirement.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job requirement not found." });
    }

    // Get the current date in 'YYYY-MM-DD' format for comparison
    const currentDate = new Date().toISOString().split("T")[0];
    const closingDate = new Date(job.closingDate).toISOString().split("T")[0];

    // Check if the closing date matches the current date
    if (closingDate === currentDate) {
      job.isActive = false; // Automatically deactivate the job
    } else {
      // Toggle the isActive field
      job.isActive = !job.isActive;
    }

    // Save the updated job
    const updatedJob = await job.save();

    res.status(200).json({
      message: `Job requirement status updated successfully. Now it is ${
        updatedJob.isActive ? "active" : "inactive"
      }.`,
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error toggling job requirement status:", error);
    res.status(500).json({
      message: "Failed to toggle job requirement status.",
      error: error.message,
    });
  }
};

module.exports = {
  createJobRequirement,
  getAllJobRequirements,
  getActiveJobRequirements,
  deleteJobRequirement,
  toggleJobRequirementStatus,
  updateJobRequirement,
};
