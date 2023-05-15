const LikeService = require("../services/like.service");

class LikeController {
  likeService = new LikeService();

  putLikes = async (req, res, next) => {
    const { user_id } = res.locals.user;
    const { product_id } = req.params;

    try {
      const like = await this.likeService.putLikes(user_id, product_id);
      const message = like ? "관심설정완료" : "관심설정취소"; //BE확인용(추후삭제가능)
      res.status(200).json({ message }); //BE확인용(추후삭제가능)
    } catch (error) {
      next(error, req, res, "관심설정이 정상적으로 실행되지 않았습니다.");
    }
  };
}

module.exports = LikeController;
