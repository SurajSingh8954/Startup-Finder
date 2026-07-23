const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ['AI', 'FinTech', 'Health', 'Education', 'E-Commerce', 'Gaming', 'Social', 'Travel', 'Environment'], required: true },
  creator:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags:        [String],
  rolesNeeded: [String],
}, { timestamps: true });

module.exports = mongoose.model('Idea', IdeaSchema);
