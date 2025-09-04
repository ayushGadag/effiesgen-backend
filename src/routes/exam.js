const express = require('express');
const { createExam, getExams, deleteExam, updateExam } = require('../controllers/examController');
const router = express.Router();

router.post('/create', createExam);
router.get('/list', getExams);
router.delete('/delete/:id', deleteExam);
router.put('/update/:id', updateExam);

module.exports = router;
