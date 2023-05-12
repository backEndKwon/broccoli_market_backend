'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    created_at: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};