const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const { protect } = require('../middleware/auth');

// GET /api/ideas  — with optional ?category=AI&search=resume&page=1
router.get('/', async (req, res) => {
  const { category, search, page = 1, limit = 9 } = req.query;
  const filter = {};
  if (category && category !== 'All') filter.category = category;
  if (search) filter.$or = [
    { title: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
  ];

  try {
    const total = await Idea.countDocuments(filter);
    const ideas = await Idea.find(filter)
      .populate('creator', 'fullName username profilePicture')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ ideas, total, pages: Math.ceil(total / limit), page: Number(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/ideas/:id
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate('creator members', 'fullName username profilePicture role');
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ideas  — protected
router.post('/', protect, async (req, res) => {
  try {
    const idea = await Idea.create({ ...req.body, creator: req.user._id, members: [req.user._id] });
    res.status(201).json(idea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/ideas/:id  — protected, creator only
router.put('/:id', protect, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    if (idea.creator.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    Object.assign(idea, req.body);
    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/ideas/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    if (idea.creator.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await idea.deleteOne();
    res.json({ message: 'Idea deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ideas/:id/like  — toggle like
router.post('/:id/like', protect, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });

    const liked = idea.likes.includes(req.user._id);
    liked ? idea.likes.pull(req.user._id) : idea.likes.push(req.user._id);
    await idea.save();
    res.json({ likes: idea.likes.length, liked: !liked });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ideas/:id/join
router.post('/:id/join', protect, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    if (idea.members.includes(req.user._id))
      return res.status(400).json({ message: 'Already a member' });

    idea.members.push(req.user._id);
    await idea.save();
    res.json({ message: 'Joined idea', members: idea.members.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
