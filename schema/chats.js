const mongoose = require("mongoose");

const ChatsSchema = new mongoose.Schema(
  {
    socket_id: {
      type: String,
    },
    members: {
      type: Array,
      required: true,
    },
    members_nickname: {
      type: Array,
      required: true,
    },
    product_id: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    is_sold: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chats", ChatsSchema);
