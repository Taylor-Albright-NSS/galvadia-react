'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Areas', {
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
      heading: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      headingColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      exitsBool: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      },
      x: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      y: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      z: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('Areas');
  }
};
