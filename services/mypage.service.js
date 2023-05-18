const MypageRepository = require("../repositories/mypage.repository");
const { Products, Likes } = require("../models/index.js");

class MypageService {
  mypageRepository = new MypageRepository(Products, Likes);

  /* 1.판매 중인 상품 목록조회 */
  getMySellingProducts = async (user_id) => {
    const getMySellingProducts =
      await this.mypageRepository.getMySellingProducts(user_id);
    if (getMySellingProducts.length===0) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "판매 상품이 존재하지 않습니다.";
      throw error;
    }
    return getMySellingProducts.sort((a, b) => b.createdAt - a.createdAt);
  };

  /* 2.판매완료(is_sold = true) 상품 목록조회 */
  getMySoldProducts = async (user_id) => {
    const getMySoldProducts = await this.mypageRepository.getMySoldProducts(
      user_id
    );
    if (getMySoldProducts.length===0) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "구매내역이 존재하지 않습니다.";
      throw error;
    }
    return getMySoldProducts.sort((a, b) => b.createdAt - a.createdAt);
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
