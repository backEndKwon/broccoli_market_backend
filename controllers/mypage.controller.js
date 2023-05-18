const MypageService = require("../services/mypage.service");

class MypageController {
  mypageService = new MypageService();
  /* 1.판매 중인 상품 목록조회 */

  getMySellingProducts = async (req, res, next) => {
    const { user_id } = res.locals.user; //이값을 바로 밑에 넣을수있는지 확인
    try {
      const getMySellingProducts =
        await this.mypageService.getMySellingProducts(user_id);
      return res.status(201).json({ sellProduct: getMySellingProducts });
    } catch (error) {
      next(error, req, res, "판매 상품 목록 조회에 실패하였습니다.");
    }
  };
  /* 2.판매완료(is_sold = true) 상품 목록조회 */
  getMySoldProducts = async (req, res, next) => {
    const { user_id } = res.locals.user;
    try {
      const getMySoldProducts = await this.mypageService.getMySoldProducts(
        user_id
      );
      return res.status(201).json({ soldProduct: getMySoldProducts });
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
      return res.status(201).json({ likeProduct: getMyLikeProducts });
    } catch (error) {
      next(error, req, res, "판매 상품 목록 조회에 실패하였습니다.");
    }
  };

  /* 4.자신의 정보 목록조회 */
  getMyInfos = async (req, res, next) => {
    const { user_id } = res.locals.user;
    try {
      const getMyInfos = await this.mypageService.getMyInfos(user_id);
      return res.status(201).json({ MyInfo: getMyInfos });
    } catch (error) {
      next(error, req, res, "내 정보 조회에 오류가 발생하였습니다");
    }
  };
}

module.exports = MypageController;
