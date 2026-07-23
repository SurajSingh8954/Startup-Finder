const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const Team = require('../models/Team');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/dashboard  — returns stats for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const [savedIdeas, teamsJoined, createdIdeas, myTeams] = await Promise.all([
      User.findById(userId).select('savedIdeas').then(u => u.savedIdeas.length),
      User.findById(userId).select('teamsJoined').then(u => u.teamsJoined.length),
      Idea.countDocuments({ creator: userId }),
      Team.find({ leader: userId }).select('name members isOpen').lean(),
    ]);

    res.json({
      stats: { savedIdeas, teamsJoined, createdIdeas },
      myTeams,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/dashboard/profile  — update own profile
router.put('/profile', protect, async (req, res) => {
  const allowed = ['fullName', 'bio', 'skills', 'experience', 'role', 'location', 'phone', 'profilePicture'];
  const updates = {};
  allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

  try {
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true })
      .select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/dashboard/save-idea/:ideaId  — toggle saved idea
router.post('/save-idea/:ideaId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const ideaId = req.params.ideaId;
    const saved = user.savedIdeas.includes(ideaId);

    saved ? user.savedIdeas.pull(ideaId) : user.savedIdeas.push(ideaId);
    await user.save();

    res.json({ saved: !saved, savedIdeas: user.savedIdeas.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
