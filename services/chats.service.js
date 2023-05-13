const ChatRepository = require("../repositories/chats.repository");
const { Chats, sequelize } = require("../models");

const { Transaction } = require("sequelize");

class ChatService {
  chatRepository = new ChatRepository(Chats);

  // GET: 자신의 전체 채팅 목록 조회
  getMyAllChats = async (user_id) => {
    try {
      const chatLists = await this.chatRepository.getMyAllChats(user_id);

      const myChats = chatLists.map((chat) => {
        const { updatedAt, content, chat_id } = chat.dataValues;
        const { product_id, title, is_sold } = chat.Product;
        const seller_nickname = chat.Product.user_id; // nickname 찾기 함수 추가 후 수정 필요
        
        // 경과 시간을 계산하기 위한 로직
        const result = getPassedTime(updatedAt);
        
        return {
          updatedAt: result,
          chat_id,
          seller_nickname,
          product_id,
          title,
          is_sold,
          lastestContent: content[content.length - 1],
        };
      });
      // console.log(myChats);
      return myChats;
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
        user_id
      );

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

function getPassedTime(updatedAt) {
  const diff = new Date().getTime() - updatedAt.getTime();
  const diffMinutes = Math.floor(diff / 1000 / 60);
  const diffHours = Math.floor(diff / 1000 / 60 / 60);
  const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24);

  let result;

  if (diffMinutes < 10) {
    result = "방금 전";
  } else if (diffHours < 1) {
    result = `${diffMinutes}분 전`;
  } else if (diffDays < 1) {
    result = `${diffHours}시간 전`;
  } else {
    result = `${diffDays}일 전`;
  }
  return result;
}

module.exports = ChatService;
