const LikeService = require("../services/like.service");

class LikeController {
  likeService = new LikeService();

  putLikes = async (req, res, next) => {
    const { user_id } = res.locals.user;
    const { post_id } = req.params;
    const existProduct = await this.likeService.existProduct(post_id);
    const existLikeId = await this.likeService.existLikeId(user_id, post_id);
    try {
      if (!existProduct) {
        return res
          .status(400)
          .json({ errorMessage: "해당 게시물이 존재하지 않습니다." });
      }

      if (!existLikeId) {
        await this.likeService.likeUp(post_id);
        await this.likeService.createLike(post_id, user_id);
        return;
      } else {
        await this.likeService.likeDown(post_id);
        await this.likeService.deleteLike(post_id, user_id);
        return;
      }
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: "관심 설정이 정상적으로 실행되지 않았습니다." });
    }
  };
}

module.exports = LikeController;
