import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Area',
      key: 'id'
    }
  },
  playerId: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
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

