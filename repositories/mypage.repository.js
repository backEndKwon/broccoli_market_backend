const { Products, Likes } = require("../models");

class MypageRepository {
  /* 1.판매 중인 + 구매한  상품 목록조회 */

  getMySoldBuyProducts = async (user_id) => {
    const getMySoldBuyProducts = await Products.findByPk(user_id);

    console.log("repo ++ ", getMySoldBuyProducts);
    return getMySoldBuyProducts;
  };

  /* 2.자신이 좋아요누른 상품 목록조회 */
  getMyLikeProducts = async (user_id) => {
    const fingMyLikeProductsId = await Likes.findByPk(user_id).post_id;
    //위의 findMyLikeProductsId를 이용할 수 있을까 ?
    //우선 controller를 최대한 간편화 시키기 위해 여기다 넣음
    const getMyLikeProducts = await Products.findByPk(fingMyLikeProductsId);
    console.log("repo like ===> ", getMyLikeProducts);
    return getMyLikeProducts;
  };
}

module.exports = MypageRepository;
