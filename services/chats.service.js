const ChatRepository = require("../repositories/chats.repository");
const ProductsRepository = require("../repositories/products.repository");
const { Products, Users, Users_info } = require("../models");
const { logger } = require("@aws-sdk/smithy-client");

class ChatService {
  chatRepository = new ChatRepository();
  productsRepository = new ProductsRepository(Products, Users, Users_info);

  // POST: 새로운 1:1 채팅 생성
  createNewChat = async (product_id, buyer_id, buyer_nickname) => {
    try {
      // 이미 채팅이 존재하는 경우
      const existChat = await this.chatRepository.checkChatExistsByProductId(
        product_id
      );

      // 같은 product_id를 가지고, 해당 유저가 이미 채팅을 생성한 경우
      if (existChat && existChat.members[0] === buyer_id) {
        const error = new Error();
        error.errorCode = 409;
        error.message = "이미 채팅이 존재합니다.";
        throw error;
      }

      // seller 정보
      const seller_info =
        await this.productsRepository.findSellerInfoByProductId(product_id);

      const createdChat = await this.chatRepository.createNewChat(
        product_id,
        buyer_id,
        seller_info.User.dataValues.user_id, // seller_id
        buyer_nickname,
        seller_info.User.dataValues.nickname, // seller_nickname
        seller_info.dataValues.title, // title
        seller_info.Users_info.dataValues.address // address
      );

      return {
        chat_id: createdChat._id,
        product_id,
        buyer_id,
        buyer_nickname,
        seller_id: seller_info.User.dataValues.user_id,
        seller_nickname: seller_info.User.dataValues.nickname,
        title: seller_info.dataValues.title,
        address: seller_info.Users_info.dataValues.address,
      };
    } catch (error) {
      throw error;
    }
  };

  getMyAllChats = async (user_id) => {
    try {
      const chatLists = await this.chatRepository.getMyAllChats(user_id);
      const allMyChats = await Promise.all(
        chatLists.map(async (chat) => {
          const latestMessage = await this.chatRepository.getLatestMessage(
            chat._id
          );
          console.log(latestMessage);
          return {
            chat_id: chat._id,
            updatedAt: chat.updatedAt,
            is_sold: chat.is_sold,
            latestMessage: {
              sender_id: latestMessage.sender_id,
              sender_nickname: latestMessage.sender_nickname,
              text: latestMessage.text,
            },
          };
        })
      );
      return allMyChats;
    } catch (error) {
      throw error;
    }
  };

  // POST: 1:1 채팅 메세지 저장
  saveChatContents = async (chat_id, text, sender_id, sender_nickname) => {
    try {
      const chatInfo = await this.chatRepository.getOneChatInfo(chat_id);

      if (
        chatInfo.members[0] !== sender_id &&
        chatInfo.members[1] !== sender_id
      ) {
        const error = new Error();
        error.errorCode = 403;
        error.message = "해당 채팅에 대한 권한이 없습니다.";
        throw error;
      }

      const savedChat = await this.chatRepository.saveChatContents(
        chat_id,
        text,
        sender_id,
        sender_nickname
      );
      return savedChat;
    } catch (error) {
      throw error;
    }
  };

  // GET: 1:1 채팅 내역 조회
  getMyOneChat = async (chat_id, user_id, user_nickname) => {
    try {
      // 채팅 조회
      const chatInfo = await this.chatRepository.getOneChatInfo(chat_id);
      if (!chatInfo) {
        const error = new Error();
        error.errorCode = 404;
        error.message = "해당 채팅이 존재하지 않습니다.";
        throw error;
      }

      if (chatInfo.members[0] !== user_id && chatInfo.members[1] !== user_id) {
        const error = new Error();
        error.errorCode = 403;
        error.message = "해당 채팅에 대한 권한이 없습니다.";
        throw error;
      }

      // 해당 채팅의 메세지 내역 전체 조회
      const messageLists = await this.chatRepository.getAllMessages(chat_id);
      const allMessages = await Promise.all(
        messageLists.map(async (message) => ({
          sender_id: parseInt(message.sender_id),
          sender_nickname: message.sender_nickname,
          text: message.text,
          createdAt: message.createdAt,
        }))
      );

      return {
        chat_id,
        product_id: chatInfo.product_id,
        address: chatInfo.address,
        my_id: user_id,
        my_nickname: user_nickname,
        another_id:
          chatInfo.members[0] === user_id
            ? chatInfo.members[1]
            : chatInfo.members[0],
        another_nickname:
          chatInfo.members[0] === user_id
            ? chatInfo.members_nickname[1]
            : chatInfo.members_nickname[0],
        is_sold: chatInfo.is_sold,
        messages: allMessages,
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ChatService;
