const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth-middleware.js");
const LikeController = require("../controllers/like.controller.js");
const likeController = new LikeController();

// 관심설정 API
router.put("/product/:product_id", authMiddleware, likeController.putLikes);
