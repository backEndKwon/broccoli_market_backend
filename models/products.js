'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: "user_id",
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Users_info, {
        targetKey: "user_info_id",
        foreignKey: "user_info_id",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Likes, {
        sourceKey: "product_id",
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Chats, {
        sourceKey: "product_id",
        foreignKey: "product_id",
      });
    }
  }
  Products.init({
    product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    user_info_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    chat_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_sold: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    photo_ip: {
      allowNull: false,
      type: DataTypes.TEXT,
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
    modelName: 'Products',
    timestamps: false,
  });
  return Products;
};