const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
