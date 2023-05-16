const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Users, Products } = require("../models");

class ChatRepository {
  constructor(ChatsModel) {
    this.chatsModel = ChatsModel;
  }

  getMyAllChats = async (user_id) => {
    try {
      const chatLists = await this.chatsModel.findAll({
        include: [
          {
            model: Products,
            attributes: ["product_id", "title", "is_sold"],
            required: true,
          },
        ],
        attributes: ["updatedAt", "content", "chat_id", "buyer_id"],
        order: [["updatedAt", "DESC"]],
        where: { [Op.or]: [{ buyer_id: user_id }, { seller_id: user_id }] },
      });
      return chatLists;
    } catch (error) {
      throw error;
    }
  };

  createNewChat = async (product_id, buyer_id, seller_id) => {
    try {
      const newChat = await this.chatsModel.create({
        product_id,
        buyer_id,
        seller_id,
        content: JSON.stringify([]), // 일단 빈 배열을 넣어줌
      });
      console.log("create 테스트", newChat);
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
          "buyer_id",
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

  saveChatContents = async (chat_id, chatRecord) => {
    try {
      await this.chatsModel.update(
        {
          content: Sequelize.literal(
            `JSON_ARRAY_APPEND(content, "$", '${JSON.stringify(chatRecord)}')`
          ),
        },
        { where: { chat_id } }
      );
    } catch (error) {
      throw error;
    }
  };

  checkBuyerIdByChatId = async (chat_id) => {
    try {
      return await this.chatsModel.findOne({
        attributes: ["buyer_id"],
        where: { chat_id },
      });
    } catch (error) {
      throw error;
    }
  };

  checkChatExists = async (product_id, buyer_id) => {
    try {
      return await this.chatsModel.findOne({
        attributes: ["chat_id"],
        where: { [Op.and]: [{ product_id }, { buyer_id }] },
      });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ChatRepository;
