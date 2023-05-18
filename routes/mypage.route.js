const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth-middleware.js");

const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

// GET: 자신이 판매중인 상품 목록 조회
router.get("/selling", authMiddleware, mypageController.getMySellingProducts);

// GET: 자신이 구매 확정한 내역
router.get("/sold", authMiddleware, mypageController.getMySoldProducts);

// GET: 관심 목록 조회(본인이 좋아요 누른)
router.get("/likes", authMiddleware, mypageController.getMyLikeProducts);

// GET: 본인정보 목록 조회(email계정 등)
router.get("/info", authMiddleware, mypageController.getMyInfos);

// 시간 여유 있다면 구현해보기
// // PATCH: 프로필 개인정보 수정
// router.patch("/", mypageController.patchMyInfo);
//  DELETE: 계정 삭제
// router.delete("/", mypageController.deleteMyInfo);

module.exports = router;
