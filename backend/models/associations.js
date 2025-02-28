import { sequelize } from '../config/db.js';
import { Area } from './area.js';
import { Enemy } from './enemy.js';
import { Item } from './item.js';
import { Keyword } from './keyword.js';
import { Npc } from './npc.js';
import { NpcDialogue } from './npcDialogue.js';
import { Player } from './player.js';

// Define associations AFTER importing models
Area.hasMany(Npc, { foreignKey: 'area_id' });
Npc.belongsTo(Area, { foreignKey: 'area_id' });

Player.belongsToMany(Npc, {
    through: 'PlayerNpc',
    foreightKey: 'playerId'
})

Npc.belongsToMany(Player, {
    through: 'PlayerNpc',
    foreignKey: 'npcId'
})

Area.hasMany(Player, { foreignKey: 'area_id' });
Player.belongsTo(Area, { foreignKey: 'area_id' });

Area.hasMany(Enemy, { foreignKey: 'area_id' });
Enemy.belongsTo(Area, { foreignKey: 'area_id' });

Area.hasMany(Keyword, { foreignKey: 'area_id' });
Keyword.belongsTo(Area, { foreignKey: 'area_id' });

const db = { sequelize, Area, Npc, Player, Keyword, Enemy, NpcDialogue };

export default db;
