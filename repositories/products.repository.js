const { Op } = require('sequelize');
// const { post } = require('superagent');

class ProductsRepository {
  constructor(model, usersInfoModel) {
    this.model = model;
    this.usersInfoModel = usersInfoModel;
  }

  createProduct = async (user_id, id, title, content, price, category, photo_ip) => {
    await this.model.create({
        user_id,
        user_info_id: user_id,
        id,
        title,
        content,
        price,
        category,
        photo_ip
    });
  };

  findAllProducts = async () => {
    return await this.model.findAll({
      include: [
        {
          model: this.usersInfoModel,
          attributes: ['address'],
        },
      ],
    });
  };

  getOneProduct = async (product_id) => {
    return await this.model.findOne({
      where: { product_id },
      include: [
        {
          model: this.usersInfoModel,
          attributes: ['address'],
        },
      ],
    });
  };

//   updateProduct = async (_postId, title, content) => {
//     return await this.model.update(
//       { title, content },
//       { where: { postId: _postId } }
//     );
//   };

//   deleteProduct = async (nickname, _postId) => {
//     return await this.model.update(
//       { status: false },
//       { where: { nickname, postId: _postId } }
//     );
//   };
}

module.exports = ProductsRepository;
