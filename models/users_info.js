"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users_info extends Model {
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

      this.hasMany(models.Products, {
        targetKey: "product_id",
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });
    }
  }
  Users_info.init(
    {
      user_info_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sold_item: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      likes: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      bought_item: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Users_info",
    }
  );
  return Users_info;
};
