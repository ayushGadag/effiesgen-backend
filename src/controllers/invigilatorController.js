const Invigilator = require('../models/Invigilator');

exports.getInvigilators = async (req, res) => {
  try {
    const invigilators = await Invigilator.findAll();
    res.json(invigilators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createInvigilator = async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const invigilator = await Invigilator.create({ name, email, department });
    res.json(invigilator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInvigilator = async (req, res) => {
  try {
    const invigilator = await Invigilator.findByPk(req.params.id);
    if (!invigilator) return res.status(404).json({ error: 'Invigilator not found' });

    await invigilator.update(req.body);
    res.json(invigilator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInvigilator = async (req, res) => {
  try {
    const invigilator = await Invigilator.findByPk(req.params.id);
    if (!invigilator) return res.status(404).json({ error: 'Invigilator not found' });

    await invigilator.destroy();
    res.json({ message: 'Invigilator deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
