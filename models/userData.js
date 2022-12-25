const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },

  backgroundURL: {
    type: String,
    default: "",
  },
  tasks: {
    type: String,
    default: "",
  },
  star: {
    type: Boolean,
    default: false,
  },
  firework: {
    type: Boolean,
    default: false,
  },
  downStar: {
    type: Boolean,
    default: false,
  },
  rippleRound: {
    type: Boolean,
    default: false,
  },
  ring: {
    type: Boolean,
    default: false,
  },
  backgroundSize: {
    type: String,
    default: "auto",
  },
});

module.exports = mongoose.model("userData", chatSchema);
