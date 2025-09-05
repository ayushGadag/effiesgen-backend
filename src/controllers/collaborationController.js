const Collaboration = require('../models/Collaboration');

exports.createCollaboration = async (req, res) => {
  try {
    const { title, description } = req.body;
    const collab = await Collaboration.create({
      title,
      description,
      createdBy: req.user.id
    });
    res.json(collab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCollaborations = async (req, res) => {
  try {
    const collabs = await Collaboration.findAll();
    res.json(collabs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
