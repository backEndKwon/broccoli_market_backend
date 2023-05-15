const { Op } = require("sequelize");
// const { post } = require('superagent');

class ProductsRepository {
  constructor(model, usersModel, usersInfoModel) {
    this.model = model;
    this.usersModel = usersModel;
    this.usersInfoModel = usersInfoModel;
  }

  createProduct = async (
    user_id,
    id,
    title,
    content,
    price,
    category,
    photo_ip
  ) => {
    await this.model.create({
      user_id,
      user_info_id: user_id,
      id,
      title,
      content,
      price,
      category,
      photo_ip,
    });
  };

  findAllProducts = async () => {
    return await this.model.findAll({
      include: [
        {
          model: this.usersInfoModel,
          attributes: ["address"],
        },
      ],
    });
  };

  findDetailProduct = async (product_id) => {
    return await this.model.findOne({
      where: { product_id },
      include: [
        {
          model: this.usersModel,
          attributes: ["id"],
        },
        {
          model: this.usersInfoModel,
          attributes: ["address"],
        },
      ],
    });
  };

  findRelatedProduct = async (category, product_id) => {
    return await this.model.findAll({
      where: {
        category,
        is_sold: false,
        product_id: {
          [Op.notIn]: [product_id],
        },
      },
      attributes: [
        'product_id',
        'title',
        'price',
        'likes',
        'views',
        'photo_ip'
      ],
      include: [
        {
          model: this.usersInfoModel,
          attributes: ["address"],
        },
      ],
    });
  };

  hitsProduct = async (product_id) => {
    await this.model.increment({ views: +1 }, { where: { product_id } });
  };

  updateProduct = async (
    product_id,
    title,
    content,
    price,
    category,
    photo_ip
  ) => {
    return await this.model.update(
      { title, content, price, category, photo_ip },
      { where: { product_id } }
    );
  };

  deleteProduct = async (product_id) => {
    return await this.model.destroy({ where: { product_id } });
  };

  makeProductSold = async (product_id) => {
    return await this.model.update(
      { is_sold: true },
      { where: { product_id } }
    );
  };

  searchProduct = async (keywords) => {
    const query = {
      where: {
        title: {
          [Op.or]: keywords.map((keyword) => ({
            [Op.substring]: [keyword],
          })),
        },
      },
    };
    const results = await this.model.findAll(query);
    return results;
  };

  findSellerInfoByProductId = async (product_id) => {
    return await this.model.findOne({
      where: { product_id },
      attibutes: ["title"],
      include: [
        {
          model: this.usersModel,
          attributes: ["user_id", "nickname"],
        },
        {
          model: this.usersInfoModel,
          attributes: ["address"],
        },
      ],
    });
  };
}

module.exports = ProductsRepository;
