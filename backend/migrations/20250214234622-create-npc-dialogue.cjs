'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NpcDialogues', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      npcId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dialogueStage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dialogue: {
        type: Sequelize.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
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
    await queryInterface.dropTable('NpcDialogues');
  }
};
