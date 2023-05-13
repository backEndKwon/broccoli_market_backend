const express = require("express");
const router = express.Router({ mergeParams: true });
// const authMiddleware = require("../middlewares/auth-middleware.js");
const ChatController = require("../controllers/chats.controller.js");
const chatController = new ChatController();

// GET: 자신의 전체 채팅 목록 조회
router.get("/", chatController.getMyAllChats);

// POST: 새로운 1:1 채팅 생성
router.post("/:product_id", chatController.createNewChat);

// GET: 1:1 채팅 내역 조회
router.get("/:chat_id", chatController.getMyOneChat);

// PATCH: 1:1 채팅 내역 저장
router.patch("/:chat_id", chatController.saveChatContents);

module.exports = router;
