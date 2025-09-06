const { Setting } = require("../models");

// GET /api/settings?keys=collaboration,notifications
exports.get = async (req, res) => {
  try {
    const keys = (req.query.keys || "").split(",").map(s => s.trim()).filter(Boolean);
    const where = keys.length ? { key: keys } : {};
    const rows = await Setting.findAll({ where });
    const out = {};
    rows.forEach(r => { try { out[r.key] = JSON.parse(r.value); } catch { out[r.key] = r.value; } });
    res.json(out);
  } catch { res.status(500).json({ msg: "Server error" }); }
};

exports.upsert = async (req, res) => {
  try {
    const { key, value } = req.body;
    const payload = typeof value === "string" ? value : JSON.stringify(value);
    await Setting.upsert({ key, value: payload });
    res.json({ ok: true });
  } catch { res.status(500).json({ msg: "Server error" }); }
};

exports.defaultCollab = (_req, res) => {
  res.json({
    messaging: { adminInvigilator: true, adminStudent: true, invigilatorStudent: false },
    notifications: [
      { event: "schedule_published", email: true, inApp: true, sms: false },
      { event: "exam_updated",       email: true, inApp: true, sms: false },
      { event: "room_changed",       email: true, inApp: true, sms: false },
    ]
  });
};
