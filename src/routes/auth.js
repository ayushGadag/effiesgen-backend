const router = require("express").Router();
const c = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/login", c.login);
router.post("/logout", auth, c.logout);     // frontend token remove karega
router.get("/profile", auth, c.getProfile);

module.exports = router;
