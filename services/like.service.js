const LikeRepository = require("../repositories/like.repository");
const { Transaction } = require("sequelize");
const { Likes, sequelize } = require("../models");

class LikeService {
  likeRepository = new LikeRepository(Likes);

  putLikes = async (user_id, product_id) => {
    let result;
    await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },

      async (t) => {
        const existProduct = await this.likeRepository.existProduct(product_id);
        if (!existProduct) {
          const error = new Error();
          error.errorCode = 404;
          error.message = "해당 게시물이 존재하지 않습니다.";
          throw error();
        }

        const existLikeId = await this.likeRepository.existLikeId(
          user_id,
          product_id
        );
        if (existLikeId === null) {
          await this.likeRepository.createLike(product_id, user_id);
          await this.likeRepository.likeUp(product_id);
          result = true; //BE확인용
        } else {
          await this.likeRepository.deleteLike(product_id, user_id);
          await this.likeRepository.likeDown(product_id);
          result = false; //BE확인용
        }
      }
    );
    return result;
  };
}

module.exports = LikeService;
