import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const PlayerNpc = sequelize.define("PlayerNpc", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    playerId: {
        type: DataTypes.INTEGER,
    },
    npcId: {
        type: DataTypes.INTEGER,
    },
    area_id: {
        type: DataTypes.INTEGER
    },
    dialogueStage: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    dialogueIndex: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    questStage: {
        type: DataTypes.INTEGER,
        defaultValue: 1
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
    })