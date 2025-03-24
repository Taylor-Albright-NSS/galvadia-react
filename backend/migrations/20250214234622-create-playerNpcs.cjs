'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlayerNpcs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      playerId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      npcId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      area_id: {
        type: Sequelize.INTEGER
      },
      dialogueStage: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      dialogueIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      questStage: {
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
    await queryInterface.dropTable('PlayerNpcs');
  }
};
