const errorWithCode = require("../utils/error");
const ProductsService = require('../services/products.service');
const {productSchema, commentSchema} = require('./joi');

class ProductsController {
  productsService = new ProductsService();

  // 중고거래 상품 생성
  createProduct = async (req, res, next) => {
    try {
      // const { userId, id } = res.locals.user;
      const user_id = 1;
      const id = 'test';
      const { value, error } = productSchema.validate(
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
      e.failedApi = '상품 생성';
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
      e.failedApi = '상품 조회';
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
      e.failedApi = '상품 상세 조회';
      next(e);
    }
  };

  // 중고거래 상품 수정
  updateProduct = async (req, res, next) => {
    try {
      const { product_id } = req.params;
      // const { nickname } = res.locals.user;
      const user_id = 1;
      const id = 'test';
      const { value, error } = productSchema.validate(
        req.body
      );
      if (error) {
        return res.status(412).json({ errorMessage: error.message });
      }
      const updateProduct = await this.productsService.updateProduct(
        product_id,
        user_id,
        id,
        value.title,
        value.content,
        value.price,
        value.category,
        value.photo_ip,
      );

      return res.status(200).json({updateProduct});
    } catch (e) {
      e.failedApi = '상품 수정';
      next(e);
    }
  };

  // 중고거래 상품 삭제
  deleteProduct = async (req, res, next) => {
    try {
      const { product_id } = req.params;
      // const { id } = res.locals.user;
      const user_id = 1;
      const id = 'test';

      await this.productsService.deleteProduct(product_id, user_id, id);

      return res.status(200).json({ message: '상품 삭제 완료' });
    } catch (e) {
      e.failedApi = '상품 삭제';
      next(e);
    }
  };
}

module.exports = ProductsController;
