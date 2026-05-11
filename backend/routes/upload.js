const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

// Storage factory
const makeStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', folder);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype.split('/')[1])) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed'));
  }
};

const uploadProject    = multer({ storage: makeStorage('projects'),     fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadExperience = multer({ storage: makeStorage('experience'),   fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
const uploadAchievement= multer({ storage: makeStorage('achievements'), fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadFeedback   = multer({ storage: makeStorage('feedback'),     fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
const uploadAvatar     = multer({ storage: makeStorage('avatar'),       fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Helper: delete old file
const deleteFile = (filePath) => {
  if (!filePath) return;
  const full = path.join(__dirname, '..', filePath.replace(/^\//, ''));
  if (fs.existsSync(full)) fs.unlinkSync(full);
};

router.post('/project', auth, uploadProject.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/projects/${req.file.filename}` });
});

router.post('/experience', auth, uploadExperience.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/experience/${req.file.filename}` });
});

router.post('/achievement', auth, uploadAchievement.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/achievements/${req.file.filename}` });
});

router.post('/feedback', auth, uploadFeedback.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/feedback/${req.file.filename}` });
});

router.post('/avatar', auth, uploadAvatar.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/avatar/${req.file.filename}` });
});

// DELETE an upload
router.delete('/', auth, (req, res) => {
  const { path: filePath } = req.body;
  try { deleteFile(filePath); res.json({ success: true }); }
  catch { res.status(500).json({ error: 'Delete failed' }); }
});

module.exports = router;
