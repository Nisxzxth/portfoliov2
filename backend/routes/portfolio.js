const router = require('express').Router();
const Portfolio = require('../models/Portfolio');

// GET /api/portfolio — get all public data
router.get('/', async (req, res) => {
  try {
    const data = await Portfolio.findOne();
    if (!data) return res.status(404).json({ error: 'Portfolio not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
