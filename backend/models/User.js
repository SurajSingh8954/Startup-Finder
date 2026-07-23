const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  fullName:       { type: String, required: true, trim: true },
  username:       { type: String, required: true, unique: true, lowercase: true },
  email:          { type: String, required: true, unique: true, lowercase: true },
  phone:          { type: String },
  password:       { type: String },           // null for OAuth users
  role:           { type: String, enum: ['Developer', 'Designer', 'Founder', 'Investor', 'Marketer'], default: 'Developer' },
  skills:         [String],
  experience:     { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], default: 'Beginner' },
  bio:            { type: String },
  profilePicture: { type: String },
  location:       { type: String },
  rating:         { type: Number, default: 0 },
  googleId:       { type: String },
  githubId:       { type: String },
  savedIdeas:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Idea' }],
  teamsJoined:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', UserSchema);
