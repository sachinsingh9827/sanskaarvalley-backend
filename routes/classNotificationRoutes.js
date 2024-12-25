const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");

router.post("/notifications", notificationsController.createNotification);
router.get("/notifications", notificationsController.getAllNotifications);
router.get(
  "/notifications/class/:classId",
  notificationsController.getNotificationsByClass
);
router.get(
  "/notifications/teacher/:teacherId",
  notificationsController.getNotificationsByTeacher
);
router.put("/notifications/:id", notificationsController.updateNotification);
router.delete("/notifications/:id", notificationsController.deleteNotification);

module.exports = router;
