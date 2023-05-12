'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    chat_count: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    is_sold: DataTypes.BOOLEAN,
    photo_ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};