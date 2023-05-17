const { Op } = require("sequelize");

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

  findDetailProduct = async (product_id, t) => {
    return await this.model.findOne({
      transaction: t,
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

  findRelatedProduct = async (category, product_id, t) => {
    return await this.model.findAll({
      transaction: t,
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

  hitsProduct = async (product_id, t) => {
    await this.model.increment({ views: +1 }, { transaction: t, where: { product_id } });
  };

  updateProduct = async (
    product_id,
    title,
    content,
    price,
    category,
    photo_ip,
    t
  ) => {
    return await this.model.update(
      { title, content, price, category, photo_ip },
      { transaction: t, where: { product_id } }
    );
  };

  deleteProduct = async (product_id, t) => {
    return await this.model.destroy({ transaction: t, where: { product_id } });
  };

  makeProductSold = async (product_id, t) => {
    return await this.model.update(
      { is_sold: true },
      { transaction: t, where: { product_id } }
    );
  };

  searchProduct = async (keywords) => {
    const query = {
      where: {
        [Op.or]: {
          title: {
            [Op.or]: keywords.map((keyword) => ({
              [Op.substring]: [keyword],
            })),
          },
          content: {
            [Op.or]: keywords.map((keyword) => ({
              [Op.substring]: [keyword],
            })),
          }
        }
      },
      include: [
        {
          model: this.usersInfoModel,
          attibutes: ['address']
        }
      ]
    };
    const results = await this.model.findAll(query);
    return results;
  };

  getRegionProduct = async (region) => {
    return await this.model.findAll({
      include: [
        {
          model: this.usersInfoModel,
          where: { address: { [Op.substring]: region } }
        },
      ],
    })
  }

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
