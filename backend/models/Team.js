const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  idea:        { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
  leader:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isOpen:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
