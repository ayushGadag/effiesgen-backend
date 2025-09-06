const { Collaboration } = require("../models");
const examCtrl = require("./examController");

// Create a simple collaboration note
exports.createCollaboration = async (req, res) => {
  try {
    const { title, description } = req.body;
    const row = await Collaboration.create({
      title,
      description,
      createdBy: req.user.id,
    });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all collaboration notes
exports.getCollaborations = async (_req, res) => {
  try {
    const rows = await Collaboration.findAll({ order: [["createdAt", "DESC"]] });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Re-use exam conflicts
exports.checkConflicts = examCtrl.conflicts;
