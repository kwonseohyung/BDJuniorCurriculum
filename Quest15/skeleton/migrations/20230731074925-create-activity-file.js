"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activity_files", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      activity_title: {
        type: Sequelize.STRING(30),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("activity_files");
  },
};
