const { Products, Likes } = require("../models");

class LikeRepository {
  /* Product 존재확인용 */
  existProduct = async (post_id) => {
    const existProduct = await Products.findByPk(post_id);
    return existProduct;
  };
  /* like_id 존재확인용 */
  existLikeId = async (user_id, post_id) => {
    const existLikeId = await Likes.findOne({
      where: { user_id, post_id },
    });
    return existLikeId;
  };
  /* ************************** */
  /* 관심 클릭시 likes_id 생성 */
  createLike = async (post_id, user_id) => {
    await Likes.create({
      user_id,
      post_id,
    });
    return;
  };
  /* likes_id 생성 시 Product의 likes +1 */
  likeUp = async (post_id) => {
    await Products.increment("likes", { where: { post_id } });
    return;
  };
  /* ************************** */
  /* 관심 취소시 likes_id 삭제 */
  deleteLike = async (post_id, user_id) => {
    await Likes.destroy({
      user_id,
      post_id,
    });
    return;
  };
  /* likes_id 삭제 시 Product의 likes -1 */
  likeDown = async (post_id) => {
    await Products.decrement("likes", { where: { post_id } });
    return;
  };
  /* ************************** */
}

module.exports = LikeRepository;
