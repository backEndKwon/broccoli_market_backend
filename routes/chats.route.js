const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth-middleware.js");
const ChatController = require("../controllers/chats.controller.js");
const chatController = new ChatController();

// POST: 새로운 1:1 채팅 생성
router.post("/:product_id", authMiddleware, chatController.createNewChat);

// GET: 자신의 전체 채팅 목록 조회
router.get("/", authMiddleware, chatController.getMyAllChats);

// POST: 1:1 채팅 내역 저장
router.post("/:chat_id/messages", authMiddleware, chatController.saveChatContents);

// GET: 1:1 채팅 내역 조회
router.get("/:chat_id", authMiddleware, chatController.getMyOneChat);

module.exports = router;
