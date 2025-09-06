const { Exam, Student, Invigilator } = require("../models");
const { Op } = require("sequelize");

// GET /api/dashboard/summary
exports.summary = async (_req, res) => {
  try {
    const now = new Date();
    const upcoming = await Exam.count({ where: { scheduledAt: { [Op.gt]: now } } });
    const totalStudents = await Student.count();
    const totalInvigilators = await Invigilator.count();

    // basic conflict count (venue or invigilator overlap)
    const all = await Exam.findAll();
    let conflicts = 0;
    for (let i=0;i<all.length;i++){
      for (let j=i+1;j<all.length;j++){
        const a = all[i], b = all[j];
        const aEnd = new Date(new Date(a.scheduledAt).getTime() + a.durationMinutes*60000);
        const bEnd = new Date(new Date(b.scheduledAt).getTime() + b.durationMinutes*60000);
        const overlap = new Date(a.scheduledAt) < bEnd && new Date(b.scheduledAt) < aEnd;
        if (!overlap) continue;
        if ((a.venue && b.venue && a.venue === b.venue) ||
            (a.invigilatorId && b.invigilatorId && a.invigilatorId === b.invigilatorId)) conflicts++;
      }
    }

    res.json({ upcoming, totalStudents, totalInvigilators, conflicts });
  } catch (e) { res.status(500).json({ msg: "Server error" }); }
};
