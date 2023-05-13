const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth-middleware.js");
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

// GET: 자신이 (is_sold:true)판매중인 상품 목록 조회
router.get("/sold", authMiddleware, mypageController.getMySoldProducts);

// GET: 관심 목록 조회(본인이 좋아요 누른)
router.get("/likes", authMiddleware, mypageController.getMyLikeProducts);

// GET: 자신이 (is_sold:false)구매 확정한 내역
router.post("/buy", authMiddleware, mypageController.getMyBuyProducts);

// 시간 여유 있다면 구현해보기
// // PATCH: 프로필 개인정보 수정
// router.patch("/", mypageController.patchMyInfo);
//  DELETE: 계정 삭제
// router.delete("/", mypageController.deleteMyInfo);
module.exports = router;