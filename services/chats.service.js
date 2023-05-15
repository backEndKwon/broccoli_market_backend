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
        const passedTime = getPassedTime(updatedAt);

        // 최근 채팅 내용을 보여주기 위한 로직
        const parsedContent = JSON.parse(content);
        const lastestContent =
          parsedContent.length > 0
            ? parsedContent[parsedContent.length - 1].content
            : "";

        return {
          updatedAt: passedTime,
          chat_id,
          seller_nickname,
          product_id,
          title,
          is_sold,
          lastestContent,
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

      // address 추가 필요

      return newChat;
    } catch (error) {
      throw error;
    }
  };

  // GET: 1:1 채팅 내역 조회
  getMyOneChat = async (chat_id) => {
    try {
      const chatContents = await this.chatRepository.getMyOneChat(chat_id);
      const { updatedAt, seller_id, content } = chatContents.dataValues;
      const passedTime = getPassedTime(updatedAt);
      // const seller_nickname = await this.chatRepository.getSellerNickname(seller_id);

      // address 받아야함
      return {
        updatedAt: passedTime,
        chatContents: JSON.parse(content),
        seller_nickname: seller_id, // seller_nickname으로 수정 필요
        chat_id,
        product_id,
        title,
        is_sold,
      };
    } catch (error) {
      throw error;
    }
  };

  // PATCH: 1:1 채팅 내역 저장
  saveChatContents = async (chat_id, contents) => {
    try {
      // 각 객체 안에 createdAt을 추가합니다.
      const chatContents = stringifiedContents.map((content) => ({
        ...content,
        createdAt: new Date(),
      }))
      const savedChat = await this.chatRepository.saveChatContents(
        chat_id,
        JSON.stringify(chatContents),
      );
      return savedChat;
    } catch (error) {
      throw error;
    }
  };
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
