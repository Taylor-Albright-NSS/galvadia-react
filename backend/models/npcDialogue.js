import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export const NpcDialogue = sequelize.define("NpcDialogues", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  npcId: {
    type: DataTypes.INTEGER,
  },
  dialogueStage: {
    type: DataTypes.INTEGER
  },
  dialogue: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
    updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
},
})

