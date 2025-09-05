const express = require('express');
const router = express.Router();
const invigilatorController = require('../controllers/invigilatorController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Invigilator list (any logged-in user)
router.get('/', auth, invigilatorController.getInvigilators);

// Create invigilator (admin only)
router.post('/', auth, role(['admin']), invigilatorController.createInvigilator);

// Update invigilator (admin only)
router.put('/:id', auth, role(['admin']), invigilatorController.updateInvigilator);

// Delete invigilator (admin only)
router.delete('/:id', auth, role(['admin']), invigilatorController.deleteInvigilator);

module.exports = router;
