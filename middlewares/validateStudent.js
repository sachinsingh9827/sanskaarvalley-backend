exports.validateStudent = (req, res, next) => {
  const {
    name,
    email,
    dob,
    classId,
    aadhaarCardNumber,
    samagraId,
    bankDetails,
  } = req.body;
  if (
    !name ||
    !email ||
    !dob ||
    !classId ||
    !aadhaarCardNumber ||
    !samagraId ||
    !bankDetails
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }
  next();
};
