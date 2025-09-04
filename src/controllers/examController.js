const Exam = require("../models/Exam");

// Create Exam
exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.json({ message: "Exam created successfully", exam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Exams
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single Exam by ID
exports.getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByPk(id);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Exam
exports.updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    await Exam.update(req.body, { where: { id } });
    res.json({ message: "Exam updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Exam
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    await Exam.destroy({ where: { id } });
    res.json({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
