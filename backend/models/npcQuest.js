import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class NpcQuest extends Model {}
NpcQuest.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    npcId: {type: DataTypes.INTEGER},
    questStage: {type: DataTypes.INTEGER},
    dialogue: {type: DataTypes.ARRAY(DataTypes.STRING)},
    completionDialogue: {type: DataTypes.ARRAY(DataTypes.STRING)},
    requirements: {type: DataTypes.JSON},
    rewards: {type: DataTypes.JSON},
    repeatable: false,
}, 
{
    sequelize,
    modelName: "NpcQuest"
})

export default NpcQuest
