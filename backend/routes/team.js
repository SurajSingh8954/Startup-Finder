const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const { protect } = require('../middleware/auth');

// GET /api/teams
router.get('/', async (req, res) => {
  const { search, page = 1, limit = 9 } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: search, $options: 'i' };

  try {
    const total = await Team.countDocuments(filter);
    const teams = await Team.find(filter)
      .populate('leader', 'fullName username profilePicture')
      .populate('members', 'fullName username profilePicture')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ teams, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/teams
router.post('/', protect, async (req, res) => {
  try {
    const team = await Team.create({ ...req.body, leader: req.user._id, members: [req.user._id] });
    req.user.teamsJoined.push(team._id);
    await req.user.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/teams/:id/join
router.post('/:id/join', protect, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    if (!team.isOpen) return res.status(400).json({ message: 'Team is closed' });
    if (team.members.includes(req.user._id))
      return res.status(400).json({ message: 'Already a member' });

    team.members.push(req.user._id);
    await team.save();

    req.user.teamsJoined.push(team._id);
    await req.user.save();

    res.json({ message: 'Joined team', members: team.members.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/teams/:id  — leader only
router.delete('/:id', protect, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    if (team.leader.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await team.deleteOne();
    res.json({ message: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
