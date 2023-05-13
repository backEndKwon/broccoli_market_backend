const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Users, Products } = require("../models");

class ChatRepository {
  constructor(ChatsModel) {
    this.chatsModel = ChatsModel;
  }

  getMyAllChats = async (buyer_id) => {
    try {
      const chatLists = await this.chatsModel.findAll({
        include: [
          {
            model: Products,
            attributes: ["user_id", "product_id", "title", "is_sold"],
            required: true,
          },
        ],
        attributes: ["updatedAt", "content", "chat_id"],
        group: ["Chats.chat_id"],
        order: [["updatedAt", "DESC"]],
        where: { buyer_id },
      });
      return chatLists;
    } catch (error) {
      throw error;
    }
  };

  createNewChat = async (product_id, buyer_id) => {
    try {
      const newChat = await this.chatsModel.create({
        product_id,
        buyer_id,
        content: JSON.stringify([]),
      });

      return newChat;
    } catch (error) {
      throw error;
    }
  };

  getMyOneChat = async (chat_id) => {};

  saveChatContents = async (chat_id) => {};
}

module.exports = ChatRepository;
