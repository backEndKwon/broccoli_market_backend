const ChatRepository = require("../repositories/chats.repository");
const AuthRepository = require("../repositories/auth.repository");
const { Chats, sequelize } = require("../models");

const { Transaction } = require("sequelize");

class ChatService {
  chatRepository = new ChatRepository(Chats);
  authRepository = new AuthRepository();

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

          allMyChats = chatLists.map((chat) => {
            const { updatedAt, content, chat_id } = chat.dataValues;
            const { product_id, title, is_sold } = chat.Product;
            const seller_id = chat.Product.user_id;
            const { nickname, address } =
              this.authRepository.findUserInfoByUserId(seller_id);

            // 경과 시간을 계산하기 위한 로직
            const passedTime = getPassedTime(updatedAt);

            // 최근 채팅 내용을 보여주기 위한 로직
            const parsedContent = JSON.parse(content);
            const lastestContent =
              parsedContent.length > 0
                ? parsedContent[parsedContent.length - 1].content
                : "";

            return {
              product_id,
              chat_id,
              seller_nickname: nickname,
              address,
              title,
              lastestContent,
              updatedAt: passedTime,
              is_sold,
            };
          });
        }
      );
      // console.log(allMyChats);
      return allMyChats;
    } catch (error) {
      throw error;
    }
  };

  // POST: 새로운 1:1 채팅 생성
  createNewChat = async (product_id, buyer_id) => {
    try {
      let newChat;
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          const createdChat = await this.chatRepository.createNewChat(
            product_id,
            buyer_id
          );

          // buyer 정보
          const buyer_info = this.authRepository.findUserInfoByUserId(buyer_id);

          // seller 정보
          const seller_info = this.authRepository.findUserInfoByUserId(
            createdChat.user_id
          );

          newChat = {
            chat_id: createdChat.chat_id,
            product_id,
            buyer_nickname: buyer_info.nickname,
            buyer_id: user_id,
            seller_nickname: seller_info.nickname,
            seller_id: createdChat.user_id,
            address: seller_info.address,
            // title
          };
        }
      );
      return newChat;
    } catch (error) {
      throw error;
    }
  };

  // GET: 1:1 채팅 내역 조회
  getMyOneChat = async (chat_id, buyer_id) => {
    try {
      let oneChat;
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          const chatContents = await this.chatRepository.getMyOneChat(chat_id);
          const { updatedAt, seller_id, content, title, product_id, is_sold } =
            chatContents.dataValues;
          const passedTime = getPassedTime(updatedAt);

          // buyer 정보
          const buyer_info = this.authRepository.findUserInfoByUserId(buyer_id);

          // seller 정보
          const seller_info =
            this.authRepository.findUserInfoByUserId(seller_id);

          oneChat = {
            chat_id,
            product_id,
            title,
            seller_nickname: seller_info.nickname,
            buyer_nickname: buyer_info.nickname,
            updatedAt: passedTime,
            is_sold,
            chatContents: JSON.parse(content),
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
          if (buyerId !== buyer_id) {
            const error = new Error();
            error.errorCode = 403;
            error.message = "해당 채팅에 대한 권한이 없습니다.";
            throw error;
          }
          await this.chatRepository.saveChatContents(chat_id, contents);
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
