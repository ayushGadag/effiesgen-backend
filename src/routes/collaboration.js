const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controllers/collaborationController");

router.post("/", auth, c.createCollaboration);
router.get("/", auth, c.getCollaborations);

// for dashboard/invigilator/timetable
router.get("/conflicts", auth, c.checkConflicts);

module.exports = router;
