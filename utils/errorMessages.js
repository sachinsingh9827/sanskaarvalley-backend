// utils/errorMessages.js

const errorMessages = {
  ADMIN: {
    MISSING_FIELDS: "All fields are required.",
    ADMIN_EXISTS: "Admin already exists.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    ADMIN_NOT_FOUND: "Admin not found.",
    GENERAL_ERROR: "An error occurred, please try again later.",
    OTP_SENT_SUCCESS: "OTP sent to your email address.",
    OTP_INVALID: "The provided OTP is invalid.",
    PASSWORD_RESET_SUCCESS: "Password has been reset successfully.",
    LOGOUT_SUCCESS: "Logout successful.",
    LOGIN_SUCCESS: "Login successful.",
    REGISTRATION_SUCCESS: "Admin registered successfully.",
    ADMIN_DELETED_SUCCESS: "Admin deleted successfully.",
    ADMIN_UPDATED_SUCCESS: "Admin updated successfully.",
  },
  STUDENT: {
    MISSING_FIELDS: "Some required fields are missing.",
    INVALID_DATE_FORMAT: "The date of birth must be in YYYY-MM-DD format.",
    EMAIL_OR_AADHAAR_ALREADY_USED:
      "The email or Aadhaar number is already in use.",
    STUDENT_ADDED_SUCCESS: "Student added successfully.",
    STUDENT_CREATION_FAILED: "Failed to add the student.",
    STUDENT_UPDATED_SUCCESS: "Student details updated successfully.",
    STUDENT_UPDATE_FAILED: "Failed to update the student details.",
    STUDENT_NOT_FOUND: "Student not found.",
    STUDENT_DELETED_SUCCESS: "Student soft deleted successfully.",
    STUDENT_DELETED_PERMANENTLY: "Student permanently deleted successfully.",
    STUDENT_REACTIVATED_SUCCESS: "Student reactivated successfully.",
    NO_STUDENTS_PROVIDED: "No students provided for bulk registration.",
    STUDENTS_ADDED_SUCCESS: "Students added successfully.",
    BULK_REGISTRATION_FAILED: "Failed to register students in bulk.",
    GENERAL_ERROR: "An error occurred while processing your request.",
  },
  SUBJECT: {
    SUBJECT_ADDED_SUCCESS: "Subject added successfully.",
    SUBJECT_FETCH_FAILED: "Failed to fetch subjects.",
    SUBJECT_NOT_FOUND: "Subject not found.",
    SUBJECT_DELETED_SUCCESS: "Subject deleted successfully.",
    SUBJECT_DELETION_FAILED: "Failed to delete the subject.",
    MISSING_FIELDS: "Name and code are required.",
    SUBJECT_CREATION_FAILED: "Failed to create the subject.",
    ACTIVE_SUBJECTS_FETCHED_SUCCESS: "Active subjects fetched successfully.",
  },
  TEACHER: {
    TEACHER_NOT_FOUND: "Teacher not found.",
    TEACHER_CREATION_FAILED: "Failed to add teacher.",
    EMAIL_ALREADY_USED: "Email is already in use.",
    TEACHER_ADDED_SUCCESS: "Teacher added successfully.",
    TEACHER_UPDATED_SUCCESS: "Teacher information updated successfully.",
    TEACHER_DELETED_SUCCESS: "Teacher deleted successfully.",
    GENERAL_ERROR: "An error occurred, please try again later.",
  },
  AUTH: {
    UNAUTHORIZED_ACCESS: "Unauthorized access.",
    SESSION_EXPIRED: "Session expired, please log in again.",
    TOKEN_INVALID: "Invalid or expired token.",
    TOKEN_REQUIRED: "Authentication token is required.",
  },
  DATABASE: {
    CONNECTION_ERROR: "Database connection error.",
    QUERY_FAILED: "Database query failed.",
  },
  NOTIFICATION: {
    NOTIFICATION_NOT_FOUND: "Notification not found.",
    NOTIFICATION_CREATION_FAILED: "Failed to create notification.",
    NOTIFICATION_UPDATED_SUCCESS: "Notification updated successfully.",
    NOTIFICATION_DELETED_SUCCESS: "Notification deleted successfully.",
    UPDATED_SUCCESS: "Notification updated successfully.",
    GENERAL_ERROR:
      "An error occurred with notifications, please try again later.",
  },
  GENERAL: {
    GENERAL_ERROR: "An error occurred, please try again later.",
    VALIDATION_ERROR: "Invalid input, please check your data.",
  },
  CONTACT: {
    ALL_FIELDS_REQUIRED: "All fields are required.",
    MESSAGE_SEND_SUCCESS: "Message sent successfully.",
    MESSAGE_SEND_FAILED: "Failed to send the message.",
    CONTACT_NOT_FOUND: "Contact not found.",
    MESSAGE_DELETED_SUCCESS: "Message deleted successfully.",
  },
  NOTIFICATION: {
    NOT_FOUND: "Notification not found.",
    CREATE_FAILED: "Failed to create notification.",
    DELETE_FAILED: "Failed to delete notification.",
    GENERAL_ERROR:
      "An error occurred with notifications, please try again later.",
    CREATED_SUCCESS: "Notification created successfully.",
    DELETED_SUCCESS: "Notification deleted successfully.",
    MISSING_CLASS: "Class field is required.",
    UPDATED_SUCCESS: "Notification updated successfully.",
    NOTIFICATION_EXISTS:
      "Notification already exists for this class or teacher.",
    UPDATE_FAILED: "Failed to update notification.",
    INVALID_ID: "Invalid notification ID provided.",
  },

  CLASS: {
    MISSING_NAME: "Class name is required.",
    SUBJECTS_REQUIRED: "Subjects are required for classes 11 and 12.",
    INVALID_CLASS_NAME: "Invalid class name. Must be between 1 and 12.",
    CLASS_ADDED_SUCCESS: "Class created successfully.",
    CLASS_CREATION_FAILED: "Failed to create class.",
    NOT_FOUND: "No classes found.",
    CLASS_UPDATED_SUCCESS: "Class updated successfully.",
    CLASS_UPDATE_FAILED: "Failed to update class.",
    CLASS_ACTIVATED_SUCCESS: "Class activated successfully.",
    DEACTIVATED_SUCCESS: "Class deactivated successfully.",
    DEACTIVATE_FAILED: "Failed to deactivate class.",
    FETCH_FAILED: "Failed to fetch classes.",
    CLASS_FETCH_FAILED: "Failed to fetch classes.",
    DELETED_SUCCESS: "Class deleted successfully.",
    DELETE_FAILED: "Failed to delete class.",
    CLASS_DEACTIVATED_SUCCESS: "Class deactivated successfully.",
    CLASS_DEACTIVATION_FAILED: "Failed to deactivate class.",
    CLASS_PROMOTION_FAILED: "Failed to promote class.",
    CLASS_PROMOTED_SUCCESS: "Class promoted successfully.",
    MAIN_SUBJECTS_REQUIRED: "Main subjects are required for classes 11 and 12.",
  },
};

module.exports = errorMessages;
