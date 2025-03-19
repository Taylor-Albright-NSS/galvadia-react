import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../config/db.js' // Import the sequelize instance from your db.js

export const Keyword = sequelize.define('Keyword', {
  // Define the fields (similar to C# properties)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Area',
      key: 'id'
    }
  },
  actionAreaId: {
    type: DataTypes.INTEGER,
  },
  npcId: {
    type: DataTypes.INTEGER
  },
  special: {
    type: DataTypes.JSON,
  },
  name: {
    type: DataTypes.STRING,
  },
  refName: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING, 
  },
  description: {
    type: DataTypes.TEXT,
  },
  displayActivate: {
    type: DataTypes.TEXT
  },
  displayAlreadyActivated: {
    type: DataTypes.TEXT
  },
  methodCode: { 
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

  