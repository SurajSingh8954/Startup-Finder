const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/developers?role=Frontend&search=react&page=1
router.get('/', async (req, res) => {
  const { role, search, page = 1, limit = 9 } = req.query;
  const filter = {};

  if (role && role !== 'All') filter.role = role;
  if (search) filter.$or = [
    { fullName: { $regex: search, $options: 'i' } },
    { skills: { $elemMatch: { $regex: search, $options: 'i' } } },
    { bio: { $regex: search, $options: 'i' } },
  ];

  try {
    const total = await User.countDocuments(filter);
    const developers = await User.find(filter)
      .select('-password -googleId -githubId')
      .sort({ rating: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ developers, total, pages: Math.ceil(total / limit), page: Number(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/developers/:id
router.get('/:id', async (req, res) => {
  try {
    const dev = await User.findById(req.params.id)
      .select('-password -googleId -githubId')
      .populate('savedIdeas', 'title category')
      .populate('teamsJoined', 'name');
    if (!dev) return res.status(404).json({ message: 'Developer not found' });
    res.json(dev);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
