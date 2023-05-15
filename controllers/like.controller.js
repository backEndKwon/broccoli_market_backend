const LikeService = require("../services/like.service");

class LikeController {
  likeService = new LikeService();

  putLikes = async (req, res, next) => {
    const { user_id } = res.locals.user;
    const { product_id } = req.params;

    try {
      await this.likeService.putLikes(user_id, product_id);
    } catch (error) {
      next(error, req, res, "관심설정이 정상적으로 실행되지 않았습니다.");
    }
  };
}

module.exports = LikeController;
