// const { Products, Likes } = require("../models");
//mocking이 어려운 상태

//DI(Dependency Injection)진행

class MypageRepository {

  constructor(ProductsModel,LikesModel){
    this.ProductsModel = ProductsModel
    this.LikesModel = LikesModel

  }
  /* 1.판매 중인 + 구매한  상품 목록조회 */
  getMySoldProducts = async (user_id) => {
    const getMySoldProducts = await this.ProductsModel.findAll({
      where: { user_id, is_sold: false },
    });
    return getMySoldProducts;
  };

  /* 2.구매완료된  상품 목록조회 */
  getMyBuyProducts = async (user_id) => {
    const getMyBuyProducts = await this.ProductsModel.findAll({
      where: { user_id, is_sold: true },
    });
    return getMyBuyProducts;
  };

  /* 3.자신이 좋아요누른 상품 목록조회 */
  getMyLikeProducts = async (user_id) => {
    const fingMyLikeProducts = await this.LikesModel.findAll({ where: { user_id } });
    const ProductId = fingMyLikeProducts.map((a) => a.product_id);
    const getMyLikeProducts = await this.ProductsModel.findAll({
      where: { product_id: ProductId },
    });
    return getMyLikeProducts;
  };
}

module.exports = MypageRepository;
