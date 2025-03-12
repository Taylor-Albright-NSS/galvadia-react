import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  ownerId: {
    type: DataTypes.INTEGER
  },
  ownerType: {
    type: DataTypes.STRING
  },
  location: {
    //If ownerType is player, location is among these: right_hand, left_hand, all other slots
    //If ownerType is anything but player, value is null
    type: DataTypes.STRING,
  },
  isTwoHanded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

