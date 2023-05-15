const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/products.controller");
const LikeController = require("../controllers/like.controller.js");
const authMiddleware = require("../middlewares/auth-middleware");
const uploadImage = require("../modules/s3.js");

const productsController = new ProductsController();
const likeController = new LikeController();

// 중고거래 상품 생성
router.post("/", uploadImage.single("photo"), productsController.createProduct);

// 중고거래 상품 전체 조회
router.get("/", productsController.getAllProduct);

// 중고거래 상품 상세 조회
router.get("/:product_id", productsController.getDetailProduct);

// 중고거래 상품 수정
router.patch("/:product_id", productsController.updateProduct);

// 중고거래 상품 삭제
router.delete("/:product_id", productsController.deleteProduct);

// 중고거래 상품 거래 완료
router.patch('/:product_id/sold', productsController.makeProductSold);

// 중고거래 상품 관심 설정
router.put("/:product_id/likes", authMiddleware, likeController.putLikes);

// 중고거래 상품 거래 검색
router.get('/search', productsController.searchProduct);

module.exports = router;
