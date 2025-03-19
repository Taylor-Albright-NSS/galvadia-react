'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlayerKeywordActivations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      playerId: {
        type: Sequelize.INTEGER,
      },
      keywordId: {
        type: Sequelize.INTEGER,
      },
      activated: {
        type: Sequelize.BOOLEAN,
      },
      requiredItemName: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('PlayerKeywordActivations');
  }
};
