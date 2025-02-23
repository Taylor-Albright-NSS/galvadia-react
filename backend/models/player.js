import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js' // Import the sequelize instance from your db.js

// Define the Player model
export const Player = sequelize.define('Player', {
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
  x: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  y: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  z: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //     model: Area, // reference the Areas table
    //     key: 'id',      // reference the ID of the area
    //   },
  },
  level: {
    type: DataTypes.INTEGER,  // Define the type as integer
    allowNull: true,         // Set validation to make this field required
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

// Player.belongsTo(Area, { foreignKey: 'area_id' });
