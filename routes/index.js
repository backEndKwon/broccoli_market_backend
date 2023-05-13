const express = require("express");
const router = express.Router();

const productRouter = require("./product.route");
const authRouter = require("./auth.route");
const chatRouter = require("./chat.route");
const mypageRouter = require("./mypage.route");
const likeRouter = require("./like.route")

router.use("/product", [productRouter,likeRouter]);
router.use("/auth", [authRouter]);
router.use("/chat", [chatRouter]);
router.use("/mypage", [mypageRouter]);


module.exports = router;
