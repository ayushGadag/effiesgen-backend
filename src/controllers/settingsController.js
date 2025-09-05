const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne({ where: { userId: req.user.id } });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { theme, notifications } = req.body;
    let settings = await Settings.findOne({ where: { userId: req.user.id } });

    if (!settings) {
      settings = await Settings.create({ userId: req.user.id, theme, notifications });
    } else {
      await settings.update({ theme, notifications });
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
