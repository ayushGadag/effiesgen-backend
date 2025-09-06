// src/routes/invigilators.js
const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const c = require("../controllers/invigilatorController");

// only ExamUnit can see all invigilators
router.get("/", auth, role(["ExamUnit"]), c.getAll);

// Invigilator can see their own exams
router.get("/my-exams", auth, role(["Invigilator"]), c.myExams);

module.exports = router;
