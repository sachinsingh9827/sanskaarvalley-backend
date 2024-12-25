const Joi = require("joi");

const notificationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  message: Joi.string().required().messages({
    "string.empty": "Message is required.",
  }),
});

const validateNotificationData = (data) => notificationSchema.validate(data);

module.exports = {
  validateNotificationData,
};
