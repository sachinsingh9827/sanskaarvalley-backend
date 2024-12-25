// controllers/contactController.js
const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { address, mobile, email, facebook, twitter, instagram, linkedin } =
      req.body;
    const newContact = new Contact({
      address,
      mobile,
      email,
      facebook,
      twitter,
      instagram,
      linkedin,
    });

    await newContact.save();
    res
      .status(201)
      .json({ message: "Contact created successfully", contact: newContact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, mobile, email, facebook, twitter, instagram, linkedin } =
      req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.address = address || contact.address;
    contact.mobile = mobile || contact.mobile;
    contact.email = email || contact.email;
    contact.facebook = facebook || contact.facebook;
    contact.twitter = twitter || contact.twitter;
    contact.instagram = instagram || contact.instagram;
    contact.linkedin = linkedin || contact.linkedin;

    await contact.save();
    res.status(200).json({ message: "Contact updated successfully", contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update contact" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Use findByIdAndDelete instead of findById and remove
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne(); // Returns the first matching contact
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get contact" });
  }
};

module.exports = { createContact, updateContact, deleteContact, getContact };
