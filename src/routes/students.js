const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const c = require("../controllers/studentController");

// Only ExamUnit can manage students
router.get("/", auth, role(["ExamUnit"]), c.getStudents);
router.post("/", auth, role(["ExamUnit"]), c.addStudent);

module.exports = router;
