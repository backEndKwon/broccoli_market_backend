const LikeRepository = require("../repositories/like.repository");
const { Transaction } = require("sequelize");
class LikeService {
  likeRepository = new LikeRepository();

  putLikes = async (user_id, product_id) => {
    try {
      const existProduct = await this.likeRepository.existProduct(product_id);
      if (!existProduct) {
        const error = new Error();
        error.errorCode = 404;
        error.message = "해당 게시물이 존재하지 않습니다.";
        throw error();
      }

      async (t) => {
        await sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        const existLikeId = await this.likeRepository.existLikeId(
          user_id,
          product_id
        );

        if (existLikeId === null) {
          await this.likeRepository.createLike(product_id, user_id);
          await this.likeRepository.likeUp(product_id);
          return res.status(200).json({ message: "관심 완료" }); //임시세팅
        } else {
          await this.likeRepository.deleteLike(product_id, user_id);
          await this.likeRepository.likeDown(product_id);
          return res.status(200).json({ message: "관심 취소" }); //임시세팅
        }
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = LikeService;
