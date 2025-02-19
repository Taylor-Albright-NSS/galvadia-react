import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js' // Import the sequelize instance from your db.js

export const Npc = sequelize.define('Npc', {
  // Define the fields (similar to C# properties)
  id: {
    type: DataTypes.INTEGER,  // Define the type as integer
    primaryKey: true,         // Mark this field as the primary key
    autoIncrement: true,      // Auto increment the ID
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Areas',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,   // Define the type as string
    allowNull: true,         // Set validation to make this field required
  },
  dialogue: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  createdAt: {
    type: DataTypes.DATE,     // Define the type as date
    defaultValue: DataTypes.NOW,  // Set default value to current timestamp
  },
  updatedAt: {
    type: DataTypes.DATE,     // Define the type as date
    defaultValue: DataTypes.NOW,  // Set default value to current timestamp
  },
}, {
  // Additional configuration options can go here
  timestamps: true,  // Enable timestamps (createdAt, updatedAt)
});

