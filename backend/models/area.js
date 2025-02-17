import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js';

// Define the Area model
export const Area = sequelize.define('Area', {
  // Define the fields (similar to C# properties)
  id: {
    type: DataTypes.INTEGER,  // Define the type as integer
    primaryKey: true,         // Mark this field as the primary key
    autoIncrement: true,      // Auto increment the ID
  },
  name: {
    type: DataTypes.STRING,   // Define the type as string
    allowNull: true,         // Set validation to make this field required
  },
  heading: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  exits: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
  },
  x: {
    type: DataTypes.INTEGER,  // Define the type as integer
    allowNull: true,         // Set validation to make this field required
  },
  y: {
    type: DataTypes.INTEGER,  // Define the type as integer
    allowNull: true,         // Set validation to make this field required
  },
  z: {
    type: DataTypes.INTEGER,  // Define the type as integer
    allowNull: true,         // Set validation to make this field required
  },
}, {
  // Additional configuration options can go here
  timestamps: true,  // Enable timestamps (createdAt, updatedAt)
});

// Area.hasMany(Player, { foreignKey: 'area_id'})