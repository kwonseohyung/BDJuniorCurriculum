"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING(10),
      },
      salt: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
