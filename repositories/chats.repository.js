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

  getMyOneChat = async (chat_id) => {
    try {
      const chatContents = await this.chatsModel.findOne({
        include: [
          {
            model: Products,
            attributes: [],
            required: true,
          },
        ],
        attributes: [
          "updatedAt",
          "content",
          "chat_id",
          [Sequelize.literal("`Product`.`user_id`"), "seller_id"],
          [Sequelize.literal("`Product`.`product_id`"), "product_id"],
          [Sequelize.literal("`Product`.`title`"), "title"],
          [Sequelize.literal("`Product`.`is_sold`"), "is_sold"],
        ],
        where: { chat_id },
      });

      return chatContents;
    } catch (error) {
      throw error;
    }
  };

  saveChatContents = async (chat_id, content) => {

  };
}

module.exports = ChatRepository;
