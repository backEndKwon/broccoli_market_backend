const Chats = require("../schema/chats.js");

class ChatRepository {
  createNewChat = async (
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

  // getMyOneChat = async (chat_id) => {
  //   try {
  //     const chatContents = await this.chatsModel.findOne({
  //       include: [
  //         {
  //           model: Products,
  //           attributes: [],
  //           required: true,
  //         },
  //       ],
  //       attributes: [
  //         "updatedAt",
  //         "content",
  //         "buyer_id",
  //         "seller_id",
  //         [Sequelize.literal("`Product`.`product_id`"), "product_id"],
  //         [Sequelize.literal("`Product`.`title`"), "title"],
  //         [Sequelize.literal("`Product`.`is_sold`"), "is_sold"],
  //       ],
  //       where: { chat_id },
  //     });

  //     return chatContents;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // saveChatContents = async (chat_id, chatRecord) => {
  //   try {
  //     await this.chatsModel.update(
  //       {
  //         content: Sequelize.literal(
  //           `JSON_ARRAY_APPEND(content, "$", '${JSON.stringify(chatRecord)}')`
  //         ),
  //       },
  //       { where: { chat_id } }
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // };

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

  checkChatExists = async (product_id) => {
    try {
      return await Chats.findOne({ product_id }).exec();
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ChatRepository;
