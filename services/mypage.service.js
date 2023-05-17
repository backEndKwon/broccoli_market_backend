const MypageRepository = require("../repositories/mypage.repository");
const { Products, Likes } = require("../models/mysql");

class MypageService {
  mypageRepository = new MypageRepository(Products, Likes);

  /* 1.판매 중인 상품 목록조회 */
  getMySoldProducts = async (user_id) => {
    const getMySoldProducts = await this.mypageRepository.getMySoldProducts(
      user_id
    );
    if (getMySoldProducts.length === 0) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "판매 상품이 존재하지 않습니다.";
      throw error;
    }
    return getMySoldProducts.sort((a, b) => b.createdAt - a.createdAt);
  };

  /* 2.구매내역 상품 목록조회 */
  getMyBuyProducts = async (user_id) => {
    const getMyBuyProducts = await this.mypageRepository.getMyBuyProducts(
      user_id
    );
    if (getMyBuyProducts.length === 0) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "구매내역이 존재하지 않습니다.";
      throw error;
    }
    return getMyBuyProducts.sort((a, b) => b.createdAt - a.createdAt);
  };

  /* 3.자신이 좋아요누른 상품 목록조회 */
  getMyLikeProducts = async (user_id) => {
    const getMyLikeProducts = await this.mypageRepository.getMyLikeProducts(
      user_id
    );
    if (!getMyLikeProducts) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "관심 상품이 존재하지 않습니다.";
      throw error;
    }
    return getMyLikeProducts.sort((a, b) => b.createdAt - a.createdAt);
  };
}

module.exports = MypageService;
