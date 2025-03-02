'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      experience: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      x: {
        type: Sequelize.INTEGER,
      },
      y: {
        type: Sequelize.INTEGER,
      },
      z: {
        type: Sequelize.INTEGER,
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};
