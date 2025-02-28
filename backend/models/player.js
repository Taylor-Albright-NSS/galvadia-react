import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.js'


class Player extends Model {
  get level() {
    const experience = this.experience
    const level = Math.floor(Math.sqrt(experience / 100))
    return level
  }
}

Player.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  x: {
    type: DataTypes.STRING,
  },
  y: {
    type: DataTypes.STRING,
  },
  z: {
    type: DataTypes.STRING,
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, 
{
  sequelize,
  modelName: "Player",
  timestamps: true,
})

export default Player

//OLD WAY OF INITIALIZING MODEL
// export const Player = sequelize.define('Player', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//   },
//   level: {
//     type: DataTypes.INTEGER
//   },
//   x: {
//     type: DataTypes.STRING,
//   },
//   y: {
//     type: DataTypes.STRING,
//   },
//   z: {
//     type: DataTypes.STRING,
//   },
//   area_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   level: {
//     type: DataTypes.INTEGER,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   timestamps: true,
// });
