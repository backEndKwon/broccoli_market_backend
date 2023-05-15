const MypageService = require("../services/mypage.service");

class MypageController {
  mypageService = new MypageService();
  /* 1.판매 중인 상품 목록조회 */

  getMySoldProducts = async (req, res, next) => {
    const { user_id } = res.locals.user; //이값을 바로 밑에 넣을수있는지 확인
    try {
      const getMySoldProducts = await this.mypageService.getMySoldProducts(
        user_id
      );
      return res.status(201).json({ soldPtoduct: getMySoldProducts });
    } catch (error) {
      next(error, req, res, "판매 상품 목록 조회에 실패하였습니다.");
    }
  };
  /* 2.구매내역 상품 목록조회(is_sold = false) */
  getMyBuyProducts = async (req, res, next) => {
    const { user_id } = res.locals.user;
    try {
      const getMyBuyProducts = await this.mypageService.getMyBuyProducts(
        user_id
      );
      return res.status(201).json({ buyProduct: getMyBuyProducts });
    } catch (error) {
      next(error, req, res, "구매내역 조회에 실패하였습니다.");
    }
  };
  /* 3.자신이 좋아요누른 상품 목록조회 */
  getMyLikeProducts = async (req, res, next) => {
    const { user_id } = res.locals.user;
    try {
      const getMyLikeProducts = await this.mypageService.getMyLikeProducts(
        user_id
      );
      return res.status(201).json({ likePtoduct: getMyLikeProducts });
    } catch (error) {
      next(error, req, res, "판매 상품 목록 조회에 실패하였습니다.");
    }
  };
}

module.exports = MypageController;
