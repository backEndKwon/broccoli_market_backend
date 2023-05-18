const Chats = require("../schema/chats.js");
const Messages = require("../schema/messages.js");

class ChatRepository {
  createNewChat = async (
    socket_id,
    product_id,
    buyer_id,
    seller_id,
    buyer_nickname,
    seller_nickname,
    title,
    address
  ) => {
    try {
      const newChat = new Chats({
        socket_id,
        product_id,
        members: [buyer_id, seller_id],
        members_nickname: [buyer_nickname, seller_nickname],
        is_sold: false,
        title,
        address,
      });
      return await newChat.save();
    } catch (error) {
      throw error;
    }
  };

  getMyAllChats = async (user_id) => {
    try {
      const chats = await Chats.find({ members: { $in: [user_id] } })
        .sort({ updatedAt: "desc" })
        .exec();
      return chats;
    } catch (error) {
      throw error;
    }
  };

  getLatestMessage = async (chat_id) => {
    try {
      return await Messages.findOne({ chat_id })
        .sort({ createdAt: "desc" })
        .limit(1)
        .exec();
    } catch (error) {
      throw error;
    }
  };

  saveChatContents = async (chat_id, text, sender_id, sender_nickname) => {
    try {
      const newMessage = new Messages({ chat_id, text, sender_id, sender_nickname });
      return await newMessage.save();
    } catch (error) {
      throw error;
    }
  };

  getAllMessages = async (chat_id) => {
    try {
      return await Messages.find({ chat_id })
        .sort({ createdAt: "desc" })
        .exec();
    } catch (error) {
      throw error;
    }
  };

  getOneChatInfo = async (chat_id) => {
    try {
      return await Chats.findOne({ _id: chat_id }).exec();
    } catch (error) {
      throw error;
    }
  };

  checkChatExistsByProductId = async (product_id) => {
    try {
      return await Chats.findOne({ product_id }).exec();
    } catch (error) {
      throw error;
    }
  };

  getCurrentSocketId = async (socket_id) => {
    try {
      return await Chats.findOne({ socket_id }).exec();
    } catch (error) {
      throw error;
    }
  }

  updateSocketId = async (chat_id, socket_id) => {
    try {
      return await Chats.updateOne({ _id: chat_id }, { socket_id }).exec();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ChatRepository;
