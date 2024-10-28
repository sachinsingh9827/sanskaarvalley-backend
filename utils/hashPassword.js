const bcrypt = require("bcrypt");

const saltRounds = 10;

// Hash password
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
exports.comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
