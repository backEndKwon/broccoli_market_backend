const ChatRepository = require("../repositories/chats.repository");
const ProductsRepository = require("../repositories/products.repository");
const { Chats, Products, Users, Users_info, sequelize } = require("../models");
const { Transaction } = require("sequelize");

class ChatService {
  chatRepository = new ChatRepository(Chats);
  productsRepository = new ProductsRepository(Products, Users, Users_info);

  // GET: 자신의 전체 채팅 목록 조회
  getMyAllChats = async (user_id) => {
    try {
      let allMyChats;
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          const chatLists = await this.chatRepository.getMyAllChats(user_id);

          allMyChats = await Promise.all(
            chatLists.map(async (chat) => {
              const { updatedAt, content, chat_id } = chat.dataValues;
              const { product_id, title, is_sold } = chat.Product;
              const seller_id = chat.Product.user_id;

              const seller_info =
                await this.productsRepository.findSellerInfoByProductId(
                  product_id
                );

              // 경과 시간을 계산하기 위한 로직
              const passedTime = getPassedTime(updatedAt);

              // 최근 채팅 내용을 보여주기 위한 로직
              const parsedContent = JSON.parse(content);
              let lastestContent;
              if(parsedContent.length > 0) {
                const lastestContentBeforeParsing = parsedContent[parsedContent.length - 1];
                lastestContent = JSON.parse(lastestContentBeforeParsing).content;
              } else {
                lastestContent = "";
              }

              return {
                chat_id,
                product_id,
                seller_nickname: seller_info.User.dataValues.nickname,
                seller_id,
                address: seller_info.Users_info.dataValues.address,
                title,
                lastestContent,
                updatedAt: passedTime,
                is_sold,
              };
            })
          );
        }
      );
      return allMyChats;
    } catch (error) {
      throw error;
    }
  };

  // POST: 새로운 1:1 채팅 생성
  createNewChat = async (product_id, buyer_id, buyer_nickname) => {
    try {
      let newChat;
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          // 이미 채팅이 존재하는 경우
          const existChat = await this.chatRepository.checkChatExists(
            product_id,
            buyer_id
          );
          if (existChat) {
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
            seller_info.User.dataValues.user_id // seller_id
          );


          newChat = {
            chat_id: createdChat.chat_id,
            product_id,
            buyer_id: createdChat.buyer_id,
            buyer_nickname,
            seller_id: seller_info.User.dataValues.user_id,
            seller_nickname: seller_info.User.dataValues.nickname,
            title: seller_info.dataValues.title,
            address: seller_info.Users_info.dataValues.address,
          };
        }
      );
      return newChat;
    } catch (error) {
      throw error;
    }
  };

  // GET: 1:1 채팅 내역 조회
  getMyOneChat = async (chat_id, buyer_id, buyer_nickname) => {
    try {
      let oneChat;
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          const chatRecords = await this.chatRepository.getMyOneChat(chat_id);
          if (!chatRecords) {
            const error = new Error();
            error.errorCode = 404;
            error.message = "해당 채팅이 존재하지 않습니다.";
            throw error;
          }

          if (chatRecords.buyer_id !== buyer_id) {
            const error = new Error();
            error.errorCode = 403;
            error.message = "해당 채팅에 대한 권한이 없습니다.";
            throw error;
          }

          const { updatedAt, content, title, product_id, is_sold } =
            chatRecords.dataValues;
          const passedTime = getPassedTime(updatedAt);

          // seller 정보
          const seller_info =
            await this.productsRepository.findSellerInfoByProductId(product_id);

          // 채팅 내역 객체화
          const chatContents = await Promise.all(
            JSON.parse(content).map((c) => {
              return JSON.parse(c);
            })
          );

          oneChat = {
            chat_id,
            product_id,
            title,
            seller_nickname: seller_info.User.dataValues.nickname,
            buyer_nickname,
            updatedAt: passedTime,
            is_sold,
            chatContents,
          };
        }
      );
      return oneChat;
    } catch (error) {
      throw error;
    }
  };

  // PATCH: 1:1 채팅 내역 저장
  saveChatContents = async (chat_id, contents, buyer_id) => {
    try {
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          const buyerId = await this.chatRepository.checkBuyerIdByChatId(
            chat_id
          );
          if (buyerId.dataValues.buyer_id !== buyer_id) {
            const error = new Error();
            error.errorCode = 403;
            error.message = "해당 채팅에 대한 권한이 없습니다.";
            throw error;
          }

          for (const content of contents) {
            await this.chatRepository.saveChatContents(chat_id, content);
          }
        }
      );
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
