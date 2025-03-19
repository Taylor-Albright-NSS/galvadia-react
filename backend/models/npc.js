import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Npc = sequelize.define('Npc', {
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
    getterMethods: {
      areaId() {
        if (this.questS)
      }
    }
});



