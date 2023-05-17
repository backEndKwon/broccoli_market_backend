const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    chat_id: {
      type: String,
      required: true,
    },
    sender_id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", MessagesSchema);
