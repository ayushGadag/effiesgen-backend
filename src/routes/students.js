const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Students list (any logged-in user)
router.get('/', auth, studentController.getStudents);

// Create student (admin only)
router.post('/', auth, role(['admin']), studentController.createStudent);

// Update student (admin only)
router.put('/:id', auth, role(['admin']), studentController.updateStudent);

// Delete student (admin only)
router.delete('/:id', auth, role(['admin']), studentController.deleteStudent);

module.exports = router;
