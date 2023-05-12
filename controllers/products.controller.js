const ProductsService = require('../services/products.service');
const Validation = require('./joi');

class ProductsController {
  productsService = new ProductsService();

  // 중고거래 상품 생성
  createProduct = async (req, res, next) => {
    try {
      // const { userId, id } = res.locals.user;
      const user_id = 1;
      const id = 'test';
      const { value, error } = Validation.validate(
        req.body
      );
      if (error) {
        return res.status(412).json({ errorMessage: error.message });
      }
      await this.productsService.createProduct(
        user_id,
        id,
        value.title,
        value.content,
        value.price,
        value.category,
        value.photo_ip
      );

      return res.status(201).json({ message: '상품 생성 완료' });
    } catch (e) {
      e.failedApi = '게시글 작성';
      next(e);
    }
  };

  // 중고거래 상품 전체 조회
  getAllProduct = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ products });
    } catch (e) {
      console.log(e);
      e.failedApi = '게시글 조회';
      next(e);
    }
  };

  // 중고거래 상품 상세 조회
  getOneProduct = async (req, res, next) => {
    try {
      const { product_id } = req.params;

      const product = await this.productsService.findOneProduct(product_id);

      return res.status(200).json({ product });
    } catch (e) {
      e.failedApi = '게시글 상세 조회';
      next(e);
    }
  };

//   // 중고거래 상품 수정
//   updateProduct = async (req, res, next) => {
//     try {
//       if (
//         Object.keys(req.body).length < 2 &&
//         Object.keys(req.body).length > 3
//       ) {
//         throw errorWithCode(412, '데이터 형식이 올바르지 않습니다.');
//       }

//       const { _postId } = req.params;
//       const { title, content, tag } = req.body;
//       const { nickname } = res.locals.user;

//       if (!title || title === '') {
//         throw errorWithCode(412, '게시글 제목의 형식이 올바르지 않습니다.');
//       }

//       if (!content || content === '') {
//         throw errorWithCode(412, '게시글 내용의 형식이 올바르지 않습니다.');
//       }

//       await this.postsService.updatePost(
//         _postId,
//         title,
//         content,
//         tag,
//         nickname
//       );

//       return res.status(200).end();
//     } catch (e) {
//       e.failedApi = '게시글 수정';
//       next(e);
//     }
//   };

//   // 중고거래 상품 삭제
//   deleteProduct = async (req, res, next) => {
//     try {
//       const { _postId } = req.params;
//       const { nickname } = res.locals.user;

//       await this.postsService.deletePost(nickname, _postId);

//       return res.status(200).end();
//     } catch (e) {
//       e.failedApi = '게시글 삭제';
//       next(e);
//     }
//   };
}

module.exports = ProductsController;
