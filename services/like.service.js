const LikeRepository = require("../repositories/like.repository");

class LikeService {
  
  likeRepository = new LikeRepository();
 
  /* Product 존재확인용 */
  existProduct = async (post_id) => {
    const existProduct = await this.likeRepository.existProduct(post_id);
    return existProduct;
  };
  /* like_id 존재확인용 */
  existLikeId = async (user_id, post_id) => {
    const existLikeId = await this.likeRepository.existLikeId(user_id, post_id);
    return existLikeId;
  };
  /* ************************** */
  /* 관심 클릭시 likes_id 생성 */
  createLike = async (post_id, user_id) => {
    await this.likeRepository.createLike(post_id, user_id);
    return;
  };
  /* likes_id 생성 시 Product의 likes +1 */
  likeUp = async (post_id) => {
    await this.likeRepository.likeUp(post_id);
    return;
  };
  /* ************************** */
  /* 관심 취소시 likes_id 삭제 */
  deleteLike = async (post_id, user_id) => {
    await this.likeRepository.deleteLike(post_id, user_id);
    return;
  };
  /* likes_id 삭제 시 Product의 likes -1 */
  likeDown = async (post_id) => {
    await this.likeRepository.likeDown(post_id);
    return;
  };
}

module.exports = LikeService;
