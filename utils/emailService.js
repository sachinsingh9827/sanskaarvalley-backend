// services/emailService.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendContactMessageEmail = async (contactMessage) => {
  try {
    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any other email provider like SendGrid, Mailgun, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    // Define the email message options
    const mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: process.env.EMAIL_USER, // recipient address (admin or support email)
      subject: `New Contact Message from ${contactMessage.name}`, // Subject line
      html: `
        <h2>Contact Message Details</h2>
        <p><strong>Name:</strong> ${contactMessage.name}</p>
        <p><strong>Email:</strong> ${contactMessage.email}</p>
        <p><strong>Mobile:</strong> ${contactMessage.mobile}</p>
        <p><strong>Subject:</strong> ${contactMessage.subject}</p>
        <p><strong>Message:</strong> ${contactMessage.message}</p>
      `, // HTML body content
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Contact message email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send contact message email.");
  }
};

module.exports = { sendContactMessageEmail };
