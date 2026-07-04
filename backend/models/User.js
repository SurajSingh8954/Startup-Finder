const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    bio: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["founder", "developer", "designer", "marketer"],
      default: "developer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);