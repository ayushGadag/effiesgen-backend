const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const c = require("../controllers/examController");

// read (role-aware)
router.get("/", auth, c.list);
router.get("/conflicts", auth, c.conflicts);
router.get("/:id", auth, c.getOne);

// write (ExamUnit only)
router.post("/", auth, role(["ExamUnit"]), c.create);
router.put("/:id", auth, role(["ExamUnit"]), c.update);
router.delete("/:id", auth, role(["ExamUnit"]), c.remove);
router.post("/:id/assign-invigilator", auth, role(["ExamUnit"]), c.assignInvigilator);
router.post("/:id/students", auth, role(["ExamUnit"]), c.setStudents);

module.exports = router;
