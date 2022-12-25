const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  imgURL: {
    type: String,
  },
});

module.exports = mongoose.model("userImg", chatSchema);
