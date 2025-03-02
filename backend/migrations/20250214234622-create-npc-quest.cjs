'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NpcQuests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      npcId: {type: Sequelize.INTEGER},
      questStage: {type: Sequelize.INTEGER},
      dialogue: {type: Sequelize.ARRAY(Sequelize.DataTypes.STRING)},
      completionDialogue: {type: Sequelize.ARRAY(Sequelize.DataTypes.STRING)},
      requirements: {type: Sequelize.JSON},
      rewards: {type: Sequelize.JSON},
      isQuestAvailable: {type: Sequelize.BOOLEAN},
      repeatable: {type: Sequelize.BOOLEAN},
      createdAt: {type: Sequelize.DATE},
      updatedAt: {type: Sequelize.DATE}
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NpcQuests');
  }
};
