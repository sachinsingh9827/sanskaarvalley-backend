const express = require("express");
const router = express.Router();
const {
  createMainSubject,
  getAllMainSubjects,
  getActiveMainSubjects,
  toggleActiveStatus,
  getMainSubject,
  updateMainSubject,
  deleteMainSubject,
} = require("../controllers/mainSubjectController");

// Routes for main subjects
router.post("/add", createMainSubject);
router.get("/", getAllMainSubjects);
router.get("/active", getActiveMainSubjects); // Get active subjects
router.patch("/toggle-active/:id", toggleActiveStatus); // Toggle active status
router.get("/:id", getMainSubject);
router.put("/:id", updateMainSubject);
router.delete("/:id", deleteMainSubject);

module.exports = router;
