const { Products, Likes } = require("../models");

class MypageRepository {
  /* 1.판매 중인 + 구매한  상품 목록조회 */
  getMySoldProducts = async (user_id) => {
    const getMySoldProducts = await Products.findAll({
      where: { user_id, is_sold: true },
    });
    return getMySoldProducts;
  };

  /* 2.판매 중인 + 구매한  상품 목록조회 */
  getMyBuyProducts = async (user_id) => {
    const getMyBuyProducts = await Products.findAll({
      where: { user_id, is_sold: false },
    });
    return getMyBuyProducts;
  };

  /* 3.자신이 좋아요누른 상품 목록조회 */
  getMyLikeProducts = async (user_id) => {
    const fingMyLikeProducts = await Likes.findAll({ where: { user_id } });
    const ProductId = fingMyLikeProducts.map((a) => a.product_id);
    const getMyLikeProducts = await Products.findAll({
      where: { product_id: ProductId },
    });
    return getMyLikeProducts;
  };
}

module.exports = MypageRepository;
