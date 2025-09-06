// src/controllers/invigilatorController.js
const Invigilator = require("../models/Invigilator");
const { Exam } = require("../models");

// ✅ ExamUnit only -> list all invigilators
exports.getAll = async (req, res) => {
  try {
    const invigs = await Invigilator.findAll();
    res.json(invigs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Invigilator -> see their assigned exams
exports.myExams = async (req, res) => {
  try {
    const userId = req.user.id;
    const invigilator = await Invigilator.findOne({ where: { email: req.user.email } });

    if (!invigilator) return res.status(404).json({ error: "Invigilator not found" });

    const exams = await Exam.findAll({
      where: { invigilatorId: invigilator.id }
    });

    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
