import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const PlayerKeywordActivation = sequelize.define("PlayerKeywordActivation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    playerId: {
        type: DataTypes.INTEGER,
    },
    keywordId: {
        type: DataTypes.INTEGER,
    },
    activated: {
        type: DataTypes.BOOLEAN
    },
    requiredItemName: {
        type: DataTypes.STRING
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