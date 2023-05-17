const ChatRepository = require("../repositories/chats.repository");
const ProductsRepository = require("../repositories/products.repository");
const { Products, Users, Users_info, sequelize } = require("../models/mysql");
const { Transaction } = require("sequelize");

class ChatService {
  chatRepository = new ChatRepository();
  productsRepository = new ProductsRepository(Products, Users, Users_info);

  // POST: 새로운 1:1 채팅 생성
  createNewChat = async (product_id, buyer_id, buyer_nickname) => {
    try {
      const newChat = await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          // 이미 채팅이 존재하는 경우
          const existChat = await this.chatRepository.checkChatExists(
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
        }
      );
      return newChat;
    } catch (error) {
      throw error;
    }
  };

  // GET: 자신의 전체 채팅 목록 조회
  // getMyAllChats = async (user_id) => {
  //   try {
  //     const chatLists = await this.chatRepository.getMyAllChats(user_id);

  //     const allMyChats = await Promise.all(
  //       chatLists.map(async (chat) => {
  //         const { updatedAt, content, chat_id, buyer_id } = chat.dataValues;
  //         const { product_id, title, is_sold } = chat.Product;

  //         // 경과 시간을 계산하기 위한 로직
  //         const passedTime = getPassedTime(updatedAt);

  //         // 최근 채팅 내용을 보여주기 위한 로직
  //         const parsedContent = JSON.parse(content);
  //         let latestContent;
  //         let latestSender;
  //         if (parsedContent.length > 0) {
  //           const lastestContentBeforeParsing =
  //             parsedContent[parsedContent.length - 1];
  //           latestContent = JSON.parse(lastestContentBeforeParsing).content;
  //           latestSender =
  //             JSON.parse(lastestContentBeforeParsing).user_id === buyer_id
  //               ? "나"
  //               : "판매자";
  //         } else {
  //           latestContent = "";
  //           latestSender = "";
  //         }

  //         return {
  //           chat_id,
  //           product_id,
  //           title,
  //           latestContent,
  //           latestSender,
  //           updatedAt: passedTime,
  //           is_sold,
  //         };
  //       })
  //     );
  //     return allMyChats;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  getMyAllChats = async (user_id) => {
    try {
      const chatLists = await this.chatRepository.getMyAllChats(user_id);
      const allMyChats = await Promise.all(chatLists.map(async (chat) => ({
        chat_id: chat._id,
        updatedAt: chat.updatedAt,
        is_sold: chat.is_sold,
      })));
      return allMyChats;
    } catch (error) {
      throw error;
    }
  };

  // GET: 1:1 채팅 내역 조회
  getMyOneChat = async (chat_id, user_id, user_nickname) => {
    try {
      const oneChat = await sequelize.transaction(
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

          if (
            chatRecords.buyer_id !== user_id &&
            chatRecords.seller_id !== user_id
          ) {
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
          const chatContents = JSON.parse(content).map((c) => JSON.parse(c));

          return {
            chat_id,
            product_id,
            title,
            my_id: user_id,
            my_nickname: user_nickname,
            another_id:
              user_id === chatRecords.buyer_id
                ? chatRecords.seller_id
                : chatRecords.buyer_id,
            another_nickname: seller_info.User.dataValues.nickname,
            address: seller_info.Users_info.dataValues.address,
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

  // POST: 1:1 채팅 내역 저장
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
