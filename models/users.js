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

      
      this.hasOne(models.Users_Info, { 
        sourceKey: 'user_id', 
        foreignKey: 'user_id',
      });
      this.hasMany(models.Products, { 
        sourceKey: 'user_id', 
        foreignKey: 'user_id', 
      });
      this.hasMany(models.Likes, { 
        sourceKey: 'user_id', 
        foreignKey: 'user_id', 
      });
      this.hasMany(models.Chats, { 
        sourceKey: 'user_id', 
        foreignKey: 'buyer_id', 
      });
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