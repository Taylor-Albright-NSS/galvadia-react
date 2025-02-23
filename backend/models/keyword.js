import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../config/db.js' // Import the sequelize instance from your db.js
import { Area } from './area.js';

export const Keyword = sequelize.define('Keyword', {
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
      model: 'Area',
      key: 'id'
    }
  },
  actionAreaId: {
    type: DataTypes.INTEGER,   // Define the type as string
    allowNull: true,         // Set validation to make this field required
  },
  actionDirections: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,   // Define the type as string
    allowNull: true,         // Set validation to make this field required
  },
  refName: {
    type: DataTypes.STRING,   // Define the type as string
    allowNull: true,         // Set validation to make this field required
  },
  color: {
    type: DataTypes.STRING,   // Define the type as string
    allowNull: true,         // Set validation to make this field required
  },
  description: {
    type: DataTypes.STRING,   // Define the type as string
    allowNull: true,
  },
  action: {
    type: DataTypes.STRING,   // Define the type as string
    allowNull: true,         // Set validation to make this field required
  },
  methodCode: {  // This field will store the specific action code for each keyword
    type: DataTypes.STRING,  // Store the method's name or a code reference
    allowNull: true,
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

  