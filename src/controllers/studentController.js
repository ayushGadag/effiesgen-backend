const { Student } = require("../models");

// List all students (ExamUnit only)
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: ["id", "name", "email"]
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new student (ExamUnit only)
exports.addStudent = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ msg: "Name and Email required" });
    }

    const student = await Student.create({ name, email });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
