const router = require('express').Router();
const Portfolio = require('../models/Portfolio');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

router.use(auth);

const getDoc = () => Portfolio.findOne();

router.get('/portfolio', async (req, res) => {
  const data = await getDoc(); res.json(data);
});

// ── Personal ──────────────────────────────────────────────
router.put('/personal', async (req, res) => {
  try {
    const data = await Portfolio.findOneAndUpdate({}, { personal: req.body }, { new: true, upsert: true });
    res.json(data.personal);
  } catch { res.status(500).json({ error: 'Update failed' }); }
});

// ── Skills (flat list) ────────────────────────────────────
router.post('/skills', async (req, res) => {
  const data = await getDoc(); data.skills.push(req.body); await data.save(); res.json(data.skills);
});
router.put('/skills/:id', async (req, res) => {
  const data = await getDoc(); const s = data.skills.id(req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  Object.assign(s, req.body); await data.save(); res.json(data.skills);
});
router.delete('/skills/:id', async (req, res) => {
  const data = await getDoc(); data.skills.pull(req.params.id); await data.save(); res.json(data.skills);
});

// ── Projects ──────────────────────────────────────────────
router.post('/projects', async (req, res) => {
  const data = await getDoc(); data.projects.push(req.body); await data.save(); res.json(data.projects);
});
router.put('/projects/:id', async (req, res) => {
  const data = await getDoc(); const p = data.projects.id(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  Object.assign(p, req.body); await data.save(); res.json(data.projects);
});
router.delete('/projects/:id', async (req, res) => {
  const data = await getDoc(); data.projects.pull(req.params.id); await data.save(); res.json(data.projects);
});

// ── Experience ────────────────────────────────────────────
router.post('/experience', async (req, res) => {
  const data = await getDoc(); data.experience.push(req.body); await data.save(); res.json(data.experience);
});
router.put('/experience/:id', async (req, res) => {
  const data = await getDoc(); const e = data.experience.id(req.params.id);
  if (!e) return res.status(404).json({ error: 'Not found' });
  Object.assign(e, req.body); await data.save(); res.json(data.experience);
});
router.delete('/experience/:id', async (req, res) => {
  const data = await getDoc(); data.experience.pull(req.params.id); await data.save(); res.json(data.experience);
});

// ── Achievements ──────────────────────────────────────────
router.post('/achievements', async (req, res) => {
  const data = await getDoc(); data.achievements.push(req.body); await data.save(); res.json(data.achievements);
});
router.put('/achievements/:id', async (req, res) => {
  const data = await getDoc(); const a = data.achievements.id(req.params.id);
  if (!a) return res.status(404).json({ error: 'Not found' });
  Object.assign(a, req.body); await data.save(); res.json(data.achievements);
});
router.delete('/achievements/:id', async (req, res) => {
  const data = await getDoc(); data.achievements.pull(req.params.id); await data.save(); res.json(data.achievements);
});

// ── Feedback ──────────────────────────────────────────────
router.post('/feedback', async (req, res) => {
  const data = await getDoc(); data.feedback.push(req.body); await data.save(); res.json(data.feedback);
});
router.put('/feedback/:id', async (req, res) => {
  const data = await getDoc(); const f = data.feedback.id(req.params.id);
  if (!f) return res.status(404).json({ error: 'Not found' });
  Object.assign(f, req.body); await data.save(); res.json(data.feedback);
});
router.delete('/feedback/:id', async (req, res) => {
  const data = await getDoc(); data.feedback.pull(req.params.id); await data.save(); res.json(data.feedback);
});

// ── Section Visibility ────────────────────────────────────
router.put('/visibility', async (req, res) => {
  try {
    const data = await Portfolio.findOneAndUpdate(
      {}, { sectionVisibility: req.body }, { new: true, upsert: true }
    );
    res.json(data.sectionVisibility);
  } catch { res.status(500).json({ error: 'Update failed' }); }
});

// ── Custom Sections ───────────────────────────────────────
router.post('/sections', async (req, res) => {
  const data = await getDoc();
  data.customSections.push({ ...req.body, id: Date.now().toString() });
  await data.save(); res.json(data.customSections);
});
router.put('/sections/:id', async (req, res) => {
  const data = await getDoc();
  const sec = data.customSections.find(s => s.id === req.params.id);
  if (!sec) return res.status(404).json({ error: 'Not found' });
  Object.assign(sec, req.body); await data.save(); res.json(data.customSections);
});
router.delete('/sections/:id', async (req, res) => {
  const data = await getDoc();
  data.customSections = data.customSections.filter(s => s.id !== req.params.id);
  await data.save(); res.json(data.customSections);
});

// ── Messages ──────────────────────────────────────────────
router.get('/messages', async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 }); res.json(messages);
});
router.put('/messages/:id/read', async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, { read: true }); res.json({ success: true });
});
router.delete('/messages/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id); res.json({ success: true });
});

module.exports = router;
