const ProductsRepository = require('./../repositories/products.repository');
const { Products, Users, Users_info } = require('./../models/');

class ProductsService {
  productsRepository = new ProductsRepository(Products, Users, Users_info);

  createProduct = async (
    user_id,
    id,
    title,
    content,
    price,
    category,
    photo_ip
  ) => {
    await this.productsRepository.createProduct(
      user_id,
      id,
      title,
      content,
      price,
      category,
      photo_ip
    );
  };

  findAllProducts = async () => {
    const products = await this.productsRepository.findAllProducts();

    products.sort((a, b) => b.created_at - a.created_at);

    // // 게시글 갯수를 20개로 제한
    // if (posts.length > 20) {
    //   posts.length = 20;
    // }

    return products.map((product) => {
      return {
        product_id: product.product_id,
        title: product.title,
        address: product.Users_info.address,
        price: product.price,
        category: product.category,
        likes: product.likes,
        views: product.views,
        createdAt: product.createdAt,
        is_sold: product.is_sold,
        photo_ip: product.photo_ip,
      };
    });
  };

  findDetailProduct = async (product_id) => {
    const product = await this.productsRepository.findDetailProduct(product_id);
    if (!product) {
      const error = new Error();
      error.errorCode = 404;
      error.message = '상품이 존재하지 않습니다.';
      throw error;
    }

    const category = product.category;
    const relatedProduct = await this.productsRepository.findRelatedProduct(
      category,
      product_id
    );

    await this.productsRepository.hitsProduct(product_id);

    return {
      product_id: product.product_id,
      id: product.User.id,
      title: product.title,
      content: product.content,
      address: product.Users_info.address,
      price: product.price,
      category: product.category,
      chat_count: product.chat_count,
      likes: product.likes,
      views: product.views,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      is_sold: product.is_sold,
      photo_ip: product.photo_ip,
      relatedProduct: relatedProduct,
    };
  };

  updateProduct = async (
    product_id,
    user_id,
    id,
    title,
    content,
    price,
    category,
    photo_ip
  ) => {
    const product = await this.productsRepository.getOneProduct(product_id);
    if (!product) {
      const error = new Error();
      error.errorCode = 404;
      error.message = '상품이 존재하지 않습니다.';
      throw error;
    }
    if (product.user_id !== user_id) {
      const error = new Error();
      error.errorCode = 403;
      error.message = '상품 수정 권한이 존재하지 않습니다.';
      throw error;
    }
    await this.productsRepository.updateProduct(
      product_id,
      title,
      content,
      price,
      category,
      photo_ip
    );

    const updateProduct = await this.productsRepository.getOneProduct(
      product_id
    );

    return {
      product_id: updateProduct.product_id,
      user_id: updateProduct.user_id,
      title: updateProduct.title,
      content: updateProduct.content,
      price: updateProduct.price,
      photo_ip: updateProduct.photo_ip,
    };
  };

  deleteProduct = async (product_id, user_id, id) => {
    const product = await this.productsRepository.getOneProduct(product_id);
    if (!product) {
      const error = new Error();
      error.errorCode = 404;
      error.message = '상품이 존재하지 않습니다.';
      throw error;
    }
    if (product.user_id !== user_id) {
      const error = new Error();
      error.errorCode = 403;
      error.message = '상품 삭제 권한이 없습니다.';
      throw error;
    }

    await this.productsRepository.deleteProduct(product_id);
  };

  searchProduct = async (keyword) => {
    const keywords = keyword.split(' ');

    const result = await this.productsRepository.searchProduct(keywords);

    return result.map((product) => {
      return {
        product_id: product.product_id,
        title: product.title,
        address: product.address,
        price: product.price,
        category: product.category,
        likes: product.likes,
        views: product.views,
        createdAt: product.createdAt,
        is_sold: product.is_sold,
        photo_ip: product.photo_ip,
      };
    });
  };
}

module.exports = ProductsService;
