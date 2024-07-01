const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  guardian: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guardian",
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
