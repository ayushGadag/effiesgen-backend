const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const c = require("../controllers/settingsController");

router.get("/", auth, role(["ExamUnit"]), c.get);
router.post("/", auth, role(["ExamUnit"]), c.upsert);
router.get("/defaults/collaboration", auth, c.defaultCollab);

module.exports = router;
