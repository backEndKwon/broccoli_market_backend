const ChatRepository = require("../repositories/chats.repository");
const { Chats, sequelize } = require("../models");

const { Transaction } = require("sequelize");

class ChatService {
  chatRepository = new ChatRepository(Chats);

  // GET: 자신의 전체 채팅 목록 조회
  getMyAllChats = async (user_id) => {
    try {
      const chatLists = await this.chatRepository.getMyAllChats(user_id);
      return chatLists;
    } catch (error) {
      throw error;
    }
  };

  // POST: 새로운 1:1 채팅 생성
  createNewChat = async (product_id, user_id) => {
    // user_id 추가 필요
    try {
      const newChat = await this.chatRepository.createNewChat(
        product_id,
        user_id,
      );
      console.log("!!!!!!", newChat);
      return newChat;
    } catch (error) {
        throw error;
    }
  };

  // GET: 1:1 채팅 내역 조회
  getMyOneChat = async (chat_id) => {};

  // PATCH: 1:1 채팅 내역 저장
  saveChatContents = async (chat_id) => {};
}

module.exports = ChatService;
