const express = require("express");
const router = express.Router();

const productRouter = require("./worldcup.routes");
const authRouter = require("./auth.routes");
const chatRouter = require("./chat.routes");
const mypageRouter = require("./mypage.routes");

router.use("/product", [productRouter]);
router.use("/auth", [authRouter]);
router.use("/chat", [chatRouter]);
router.use("/mypage", [mypageRouter]);

module.exports = router;
