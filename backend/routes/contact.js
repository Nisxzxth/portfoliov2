const router = require('express').Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });
    await Contact.create({ name, email, message });
    res.json({ success: true, message: 'Message received!' });
  } catch {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
