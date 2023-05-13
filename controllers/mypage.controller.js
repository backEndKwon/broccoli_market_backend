const MypageService = require("../services/mypage.service");

class MypageController {
  
  mypageService = new MypageService();
  /* 1.판매 중인 상품 목록조회 */
  getMySoldProducts = async (req, res, next) => {
    const { user_id } = res.locals.user;
    try {
      const getMySoldProducts =
        await this.mypageService.getMySoldBuyProducts(user_id);
      if (!getMySoldProducts.is_sold) {
        return res
          .status(400)
          .json({ errorMessage: "판매상품이 존재하지 않습니다." });
      }
      return res.status(200).json({ soldPtoduct: getMySoldProducts });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: "판매 상품 목록 조회에 실패하였습니다." });
    }
  };

  /* 2.자신이 좋아요누른 상품 목록조회 */
  getMyLikeProducts = async (req, res, next) => {
    const { user_id } = res.locals.user;
    try {
      const getMyLikeProducts = await this.mypageService.getMyLikeProducts(
        user_id
      );
      if (getMyLikeProducts === null) {
        return res
          .status(400)
          .json({ errorMessage: "관심상품이 존재하지 않습니다." });
      }
      return res.status(200).json({ likePtoduct: getMyLikeProducts });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: "관심상품 목록 조회에 실패하였습니다." });
    }
  };

  /* 3.구매내역 상품 목록조회(is_sold = false) */
  getMyBuyProducts = async (req, res, next) => {
    const { user_id } = res.locals.user;
    try {
      const getMyBuyProducts =
        await this.mypageService.getMySoldBuyProducts(user_id);
      if (!getMyBuyProducts.is_sold) {
        return res
          .status(400)
          .json({ errorMessage: " 구매내역이 존재하지 않습니다." });
      }
      return res.status(200).json({ buyProduct: getMyBuyProducts });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: "구매내역 조회에 실패하였습니다." });
    }
  };
}

module.exports = MypageController;
