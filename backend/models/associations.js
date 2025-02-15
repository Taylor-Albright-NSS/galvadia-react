import { sequelize } from '../config/db.js';
import { Area } from './area.js';
import { Player } from './player.js';

// Define associations AFTER importing models
Area.hasMany(Player, { foreignKey: 'area_id' });
Player.belongsTo(Area, { foreignKey: 'area_id' });

console.log('Area associations:', Area.associations);
console.log('Player associations:', Player.associations);

const db = { sequelize, Area, Player };

export default db;
