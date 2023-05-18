// const { Products, Likes } = require("../models");
//DI(Dependency Injection)진행

class MypageRepository {
  constructor(ProductsModel, LikesModel, UsersInfoModel, UsersModel) {
    this.ProductsModel = ProductsModel;
    this.LikesModel = LikesModel;
    this.UsersInfoModel = UsersInfoModel;
    this.UsersModel = UsersModel;
  }
  /* 1.판매 중(is_sold = false) 상품 목록조회 */
  getMySellingProducts = async (user_id) => {
    const getMySellingProducts = await this.ProductsModel.findAll({
      where: { user_id, is_sold: false },
    });
    return getMySellingProducts;
  };

  /* 2.판매완료(is_sold = true) 상품 목록조회 */
  getMySoldProducts = async (user_id) => {
    const getMySoldProducts = await this.ProductsModel.findAll({
      where: { user_id, is_sold: true },
    });
    return getMySoldProducts;
  };

  /* 3.자신이 좋아요누른 상품 목록조회 */
  getMyLikeProducts = async (user_id) => {
    const fingMyLikeProducts = await this.LikesModel.findAll({
      where: { user_id },
    });
    const ProductId = fingMyLikeProducts.map((a) => a.product_id);
    const getMyLikeProducts = await this.ProductsModel.findAll({
      where: { product_id: ProductId },
    });
    return getMyLikeProducts;
  };

  /* 4.자신의 정보 목록조회 */
  //Users = 닉네임, 유저id, 아이디, 패스워드
  //UsersInfos = 유저인포id, 유저id, 이메일, 주소, 판매내역(빈값), 관심목록(빈값), 구매내역(빈값)
  getMyInfos = async (user_id) => {
    const getMyUsersInfo = await this.UsersInfoModel.findAll({
      include: [
        {
          model: this.UsersModel,
          attributes: ["nickname"],
          where: { user_id },
          required: true,
        },
      ],
      where: { user_id },
    });
    return getMyUsersInfo;
  };
}

module.exports = MypageRepository;
