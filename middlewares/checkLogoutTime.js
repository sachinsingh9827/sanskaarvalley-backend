// middleware/checkLogoutTime.js

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

const checkLogoutTime = (req, res, next) => {
  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();

  // Check if the current time is 11:59 PM
  if (currentHour === 23 && currentMinute === 59) {
    // Log out the student
    req.session.destroy((err) => {
      if (err) {
        return sendErrorResponse(
          res,
          500,
          "Could not log out. Please try again."
        );
      }
    });
    return sendErrorResponse(res, 401, "Session expired. Please log in again.");
  }

  next(); // Proceed to the next middleware/controller
};

module.exports = checkLogoutTime;
