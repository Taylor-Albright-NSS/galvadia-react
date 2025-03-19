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
      npcId: {
        type: Sequelize.INTEGER
      },
      special: {
        type: Sequelize.JSON,
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
      displayActivate: {
        type: Sequelize.TEXT
      },
      displayAlreadyActivated: {
        type: Sequelize.TEXT
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
