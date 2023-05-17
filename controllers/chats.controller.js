const ChatService = require("../services/chats.service");

class ChatController {
  chatService = new ChatService();

  // POST: 새로운 1:1 채팅 생성 
  createNewChat = async (req, res, next) => {
    const { product_id } = req.params;
    const { user_id, nickname } = res.locals.user;
    try {
      const newChat = await this.chatService.createNewChat(
        parseInt(product_id),
        user_id,
        nickname
      );
      res.status(201).json({ newChat });
    } catch (error) {
      next(error, req, res, "새로운 채팅 생성에 실패하였습니다.");
    }
  };

  // GET: 자신의 전체 채팅 목록 조회
  getMyAllChats = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const chatLists = await this.chatService.getMyAllChats(user_id);
      res.status(200).json({ chatLists });
    } catch (error) {
      next(error, req, res, "채팅 내역 조회에 실패하였습니다.");
    }
  };

  // POST: 1:1 채팅 내역 저장
  saveChatContents = async (req, res, next) => {
    try {
      const { chat_id } = req.params;
      const { text } = req.body;
      const { user_id } = res.locals.user;
      await this.chatService.saveChatContents(chat_id, text, user_id);
      res
        .status(201)
        .json({ message: "채팅 내역 저장이 정상적으로 완료되었습니다." });
    } catch (error) {
      next(error, req, res, "채팅 내역 저장에 실패하였습니다.");
    }
  };

  // GET: 1:1 채팅 내역 조회
  getMyOneChat = async (req, res, next) => {
    const { chat_id } = req.params;
    const { user_id, nickname } = res.locals.user;
    try {
      const chatInfo = await this.chatService.getMyOneChat(
        chat_id,
        user_id,
        nickname
      );
      res.status(200).json({ chatInfo });
    } catch (error) {
      next(error, req, res, "채팅 내역 조회에 실패하였습니다.");
    }
  };

}

module.exports = ChatController;
