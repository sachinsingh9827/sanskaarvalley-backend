// controllers/contactController.js
const { json } = require("express");
const Contact = require("../models/contactModel");
const errorMessages = require("../utils/errorMessages"); // Import error messages

// Create a new contact message
const createContactMessage = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    // Basic validation to check that all required fields are provided
    if (!name || !mobile || !email || !subject || !message) {
      return res.status(400).json({
        message:
          "All fields (name, mobile, email, subject, message) are required.",
      });
    }

    // Check if the email is already in the database (since it's unique)
    const existingContactByEmail = await Contact.findOne({ email });
    const existingContactByMobile = await Contact.findOne({ mobile });

    if (existingContactByEmail && existingContactByMobile) {
      return res.status(400).json({
        message:
          "This email and mobile number have already been used for a contact message.",
      });
    }

    if (existingContactByEmail) {
      return res.status(400).json({
        message: "This email has already been used for a contact message.",
      });
    }

    if (existingContactByMobile) {
      return res.status(400).json({
        message:
          "This mobile number has already been used for a contact message.",
      });
    }

    // Proceed with the rest of the logic (e.g., saving the contact)

    // Continue with your logic after ensuring email and mobile are unique

    // Create a new contact message
    const contactMessage = new Contact({
      name,
      email,
      mobile,
      subject,
      message,
    });

    // Save the contact message to the database
    await contactMessage.save();

    return res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return res
      .status(500)
      .json({ message: "Failed to send the message.", error: error.message });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters

    // Find and delete the contact message
    const result = await Contact.findByIdAndDelete(id);

    // Check if the message was found and deleted
    if (!result) {
      return res
        .status(404)
        .json({ message: errorMessages.CONTACT.CONTACT_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ message: errorMessages.CONTACT.MESSAGE_DELETED_SUCCESS });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.CONTACT.MESSAGE_SEND_FAILED });
  }
}; // Get all contact messages
const getAllContactMessages = async (req, res) => {
  try {
    // Get page and limit from query parameters with default values
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10 messages per page

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch contacts with limit and skip for pagination
    const contacts = await Contact.find().skip(skip).limit(limit);

    // Get the total count of contact messages
    const totalContacts = await Contact.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalContacts / limit);

    // Return the paginated result
    return res.status(200).json({
      contacts,
      currentPage: page,
      totalPages,
      totalContacts,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.CONTACT.MESSAGE_SEND_FAILED });
  }
};

module.exports = {
  createContactMessage,
  deleteContactMessage,
  getAllContactMessages,
};
