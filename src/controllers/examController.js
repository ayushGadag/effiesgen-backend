const { Exam, Invigilator, Student, User } = require("../models");

function toDateTime(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}`);
}
async function getMe(req) { return User.findByPk(req.user.id); }

// ===== LIST (role-aware) =====
exports.list = async (req, res) => {
  try {
    const role = req.user.role;

    if (role === "ExamUnit") {
      const data = await Exam.findAll({
        order: [["date", "ASC"], ["time", "ASC"]],
        include: [
          { model: Invigilator, attributes: ["id", "name", "email"] },
          { model: Student, attributes: ["id", "name", "email"], through: { attributes: [] } }
        ]
      });
      return res.json(data);
    }

    if (role === "Student") {
      const me = await getMe(req);
      const stu = await Student.findOne({ where: { email: me.email } });
      if (!stu) return res.json([]);
      const data = await Exam.findAll({
        order: [["date", "ASC"], ["time", "ASC"]],
        include: [
          { model: Invigilator, attributes: ["id", "name", "email"] },
          { model: Student, where: { id: stu.id }, attributes: ["id", "name", "email"], through: { attributes: [] } }
        ]
      });
      return res.json(data);
    }

    if (role === "Invigilator") {
      const me = await getMe(req);
      const inv = await Invigilator.findOne({ where: { email: me.email } });
      if (!inv) return res.json([]);
      const data = await Exam.findAll({
        where: { invigilatorId: inv.id },
        order: [["date", "ASC"], ["time", "ASC"]],
        include: [
          { model: Invigilator, attributes: ["id", "name", "email"] },
          { model: Student, attributes: ["id", "name", "email"], through: { attributes: [] } }
        ]
      });
      return res.json(data);
    }

    res.json([]);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// ===== GET ONE (role-aware) =====
exports.getOne = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id, {
      include: [
        { model: Invigilator, attributes: ["id", "name", "email"] },
        { model: Student, attributes: ["id", "name", "email"], through: { attributes: [] } }
      ]
    });
    if (!exam) return res.status(404).json({ msg: "Not found" });

    const role = req.user.role;
    if (role === "ExamUnit") return res.json(exam);

    const me = await getMe(req);

    if (role === "Student") {
      const stu = await Student.findOne({ where: { email: me.email } });
      if (!stu) return res.status(403).json({ msg: "Access denied" });
      const assigned = exam.Students.some(s => s.id === stu.id);
      if (!assigned) return res.status(403).json({ msg: "Access denied" });
      return res.json(exam);
    }

    if (role === "Invigilator") {
      const inv = await Invigilator.findOne({ where: { email: me.email } });
      if (!inv || exam.invigilatorId !== inv.id) {
        return res.status(403).json({ msg: "Access denied" });
      }
      return res.json(exam);
    }

    res.status(403).json({ msg: "Access denied" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// ===== CREATE / UPDATE / DELETE (ExamUnit only) =====
exports.create = async (req, res) => {
  try {
    const { title, course, date, time, durationMinutes, venue, invigilatorId, studentIds = [] } = req.body;
    const exam = await Exam.create({
      title, course, date, time, durationMinutes, venue,
      invigilatorId: invigilatorId || null
    });
    if (studentIds.length) {
      const studs = await Student.findAll({ where: { id: studentIds } });
      await exam.setStudents(studs);
    }
    const full = await Exam.findByPk(exam.id, { include: [Invigilator, Student] });
    res.status(201).json(full);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ msg: "Not found" });
    await exam.update(req.body);
    const full = await Exam.findByPk(exam.id, { include: [Invigilator, Student] });
    res.json(full);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ msg: "Not found" });
    await exam.destroy();
    res.json({ msg: "Deleted" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// ===== Assignments (ExamUnit only) =====
exports.assignInvigilator = async (req, res) => {
  try {
    const { invigilatorId } = req.body;
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ msg: "Not found" });
    await exam.update({ invigilatorId: invigilatorId || null });
    const full = await Exam.findByPk(exam.id, { include: [Invigilator, Student] });
    res.json(full);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.setStudents = async (req, res) => {
  try {
    const { studentIds = [] } = req.body;
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ msg: "Not found" });
    const studs = await Student.findAll({ where: { id: studentIds } });
    await exam.setStudents(studs);
    const full = await Exam.findByPk(exam.id, { include: [Invigilator, Student] });
    res.json(full);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// ===== Conflicts =====
exports.conflicts = async (_req, res) => {
  try {
    const exams = await Exam.findAll();
    const items = exams.map(x => ({
      id: x.id,
      title: x.title,
      invigilatorId: x.invigilatorId,
      venue: x.venue,
      start: toDateTime(x.date, x.time),
      end: new Date(toDateTime(x.date, x.time).getTime() + (x.durationMinutes || 120) * 60000)
    }));

    const conflicts = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i], b = items[j];
        const overlap = a.start < b.end && b.start < a.end;
        const sameVenue = a.venue === b.venue;
        const sameInv = a.invigilatorId && b.invigilatorId && a.invigilatorId === b.invigilatorId;
        if (overlap && (sameVenue || sameInv)) {
          conflicts.push({
            a: { id: a.id, title: a.title },
            b: { id: b.id, title: b.title },
            reason: sameVenue && sameInv ? "Venue & Invigilator clash" : (sameVenue ? "Venue clash" : "Invigilator clash")
          });
        }
      }
    }
    res.json({ count: conflicts.length, conflicts });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};
