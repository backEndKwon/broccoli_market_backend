const MypageRepository = require("../repositories/mypage.repository");

class MypageService {
  mypageRepository = new MypageRepository();
  /* 1.판매 중인 + 구매한  상품 목록조회 */
  getMySoldBuyProducts = async (user_id) => {
    const getMySoldBuyProducts = await this.mypageRepository.getMySoldBuyProducts(
      user_id
    );
    return getMySoldBuyProducts;
  };

  /* 2.자신이 좋아요누른 상품 목록조회 */
  getMyLikeProducts = async (user_id) => {
    const getMyLikeProducts = await this.mypageRepository.getMyLikeProducts(
      user_id
    );
    return getMyLikeProducts;
  };
}

module.exports = MypageService;
