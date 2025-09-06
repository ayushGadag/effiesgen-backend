const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controllers/dashboardController");

// all roles देख सकते हैं (UI dashboard cards)
router.get("/summary", auth, c.summary);

module.exports = router;
