import { sequelize } from '../config/db.js'
import Area from './area.js'
import { Enemy } from './enemy.js'
import { EnemyType } from './enemyType.js'
import { Item } from './item.js'
import { Keyword } from './keyword.js'
import { Npc } from './npc.js'
import { NpcDialogue } from './npcDialogue.js'
import Player from './player.js'
import { PlayerClass } from './playerClass.js'
import { PlayerNpc } from './playerNpc.js'
import { PlayerRace } from './playerRace.js'
import { Weapon } from './weapon.js'
// Define associations AFTER importing models
Area.hasMany(Npc, { foreignKey: 'area_id' })
Npc.belongsTo(Area, { foreignKey: 'area_id' })

Player.belongsToMany(Npc, {
	through: 'PlayerNpc',
	foreignKey: 'playerId',
})

Npc.belongsToMany(Player, {
	through: 'PlayerNpc',
	foreignKey: 'npcId',
})

PlayerNpc.belongsTo(Npc, { foreignKey: 'npcId' })
Npc.hasMany(PlayerNpc, { foreignKey: 'npcId' })

PlayerNpc.belongsTo(Player, { foreignKey: 'playerId' })
Player.hasMany(PlayerNpc, { foreignKey: 'playerId' })

Keyword.belongsToMany(Player, { through: 'PlayerKeywordActivations', foreignKey: 'keywordId' })
Player.belongsToMany(Keyword, { through: 'PlayerKeywordActivations', foreignKey: 'playerId' })

Area.hasMany(Player, { foreignKey: 'area_id' })
Player.belongsTo(Area, { foreignKey: 'area_id' })

Area.hasMany(Enemy, { foreignKey: 'area_id' })
Enemy.belongsTo(Area, { foreignKey: 'area_id' })

Area.hasMany(Keyword, { foreignKey: 'area_id' })
Keyword.belongsTo(Area, { foreignKey: 'area_id' })

Item.hasOne(Weapon, { foreignKey: 'itemId' })
Weapon.belongsTo(Item, { foreignKey: 'itemId' })

Player.belongsTo(PlayerRace, { foreignKey: 'raceId' })
PlayerRace.hasMany(Player, { foreignKey: 'raceId' })

Player.belongsTo(PlayerClass, { foreignKey: 'classId' })
PlayerClass.hasMany(Player, { foreignKey: 'classId' })
// itemTemplate.hasMany(LootTable, { foreignKey: 'itemTemplateId' })
// LootTable.belongsTo(itemTemplate, { foreignKey: 'itemTemplateId' })

const db = { sequelize, Area, Npc, Player, Keyword, Enemy, NpcDialogue }

Enemy.belongsTo(EnemyType, { foreignKey: 'enemyTypeId' })
EnemyType.hasMany(Enemy, { foreignKey: 'enemyTypeId' })

export default db
