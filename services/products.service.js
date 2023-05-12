const ProductsRepository = require('./../repositories/products.repository');
const { Products, Users_info } = require('./../models/');

class ProductsService {
  productsRepository = new ProductsRepository(Products, Users_info);

  createProduct = async (user_id, id, title, content, price, category, photo_ip) => {
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
        created_at: product.created_at,
        is_sold: product.is_sold,
        photo_ip: product.photo_ip,
      };
    });
  };

  findOneProduct = async (product_id) => {
    const product = await this.productsRepository.getOneProduct(product_id);
    if (!product) {
      throw new Error('게시글이 존재하지 않습니다.');
    }

    return {
      title: product.title,
      content: product.content,
      address: product.Users_info.address,
      price: product.price,
      category: product.category,
      chat_count: product.chat_count,
      likes: product.likes,
      views: product.views,
      created_at: product.created_at,
      updated_at: product.updated_at,
      is_sold: product.is_sold,
      photo_ip: product.photo_ip,
    };
  };

//   updateProduct = async (_postId, title, content, tag, nickname) => {
//     const post = await this.productsRepository.getOnePost(_postId);
//     if (!post) {
//       throw errorWithCode(404, '게시글이 존재하지 않습니다.');
//     }
//     if (post.nickname !== nickname) {
//       throw errorWithCode(403, '게시글 수정 권한이 존재하지 않습니다.');
//     }

//     await this.postsRepository.updateProduct(_postId, title, content);
//   };

//   deleteProduct = async (nickname, _postId) => {
//     const post = await this.postsRepository.getOnePost(_postId);
//     if (!post) {
//       throw errorWithCode(404, '게시글이 존재하지 않습니다.');
//     }
//     if (post.nickname !== nickname) {
//       throw errorWithCode(403, '게시글 수정 권한이 존재하지 않습니다.');
//     }

//     await this.postsRepository.deleteProduct(nickname, _postId);
//   };
}

module.exports = ProductsService;
