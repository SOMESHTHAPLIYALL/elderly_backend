const mongoose = require("mongoose");

const guardianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const Guardian = mongoose.model("guardian", guardianSchema);

module.exports = Guardian;
