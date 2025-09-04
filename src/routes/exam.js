const express = require("express");
const router = express.Router();

// Import exam controller functions
const {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam
} = require("../controllers/examController");

// Import middlewares
const auth = require("../middleware/auth");
const role = require("../middleware/role");

/**
 * ================= ADMIN ONLY ROUTES =================
 * These routes can only be accessed by users with role = "admin"
 */

// Create a new exam
router.post("/", auth, role(["admin"]), createExam);

// Update an existing exam
router.put("/:id", auth, role(["admin"]), updateExam);

// Delete an exam
router.delete("/:id", auth, role(["admin"]), deleteExam);

/**
 * ================= ADMIN + STUDENT ROUTES =================
 * Both "student" and "admin" users can view exams
 */

// Get all exams
router.get("/", auth, role(["student", "admin"]), getAllExams);

// Get a single exam by ID
router.get("/:id", auth, role(["student", "admin"]), getExamById);

module.exports = router;
