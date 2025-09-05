const express = require('express');
const router = express.Router();
const { createCollaboration, getCollaborations } = require('../controllers/collaborationController');
const auth = require('../middleware/auth');

router.post('/', auth, createCollaboration);
router.get('/', auth, getCollaborations);

module.exports = router;
