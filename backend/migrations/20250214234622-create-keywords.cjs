'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Keywords', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      actionAreaId: {
        type: Sequelize.INTEGER,
      },
      actionDirections: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      refName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      action: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      methodCode: {  // This field will store the specific action code for each keyword
        type: Sequelize.STRING,  // Store the method's name or a code reference
        allowNull: true,
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
    await queryInterface.dropTable('Keywords');
  }
};
