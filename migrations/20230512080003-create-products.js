"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      user_info_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users_info",
          key: "user_info_id",
        },
        onDelete: "CASCADE",
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      chat_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_sold: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      photo_ip: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};