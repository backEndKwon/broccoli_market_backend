'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_info.init({
    user_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    sold_item: DataTypes.STRING,
    likes: DataTypes.STRING,
    bought_item: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users_info',
  });
  return Users_info;
};