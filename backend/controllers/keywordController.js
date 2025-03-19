import { Item } from "../models/item.js"
import Player from "../models/player.js"
import { PlayerKeywordActivation } from "../models/playerKeywordActivation.js"
import { PlayerNpc } from "../models/playerNpc.js"

export const patchKeywordActivation = async (req, res) => {
  try {
      const { player, keyword } = req.body
      const playerId = player.id
      const keywordId = keyword.id
      const { special } = keyword
      const { npcId } = keyword
      console.log("Pre PlayerNPC")
      let playerNpcRelationship = await PlayerNpc.findOne({where: {npcId: npcId, playerId: playerId}})
      console.log("Post-playernpc")
      console.log(playerNpcRelationship, "playerNpcRelationship")
      if (playerNpcRelationship?.questStage > 1) {
        return res.status(422).json({message: "Quest already complete"})
      }
      console.log(2)
      let keywordActivation = await PlayerKeywordActivation.findOne({where: {keywordId: keywordId, playerId: playerId}})
      console.log(3)
      if (!keywordActivation && playerId && keywordId) {
          console.log(4)
          keywordActivation = await PlayerKeywordActivation.create({playerId: playerId, keywordId: keywordId, activated: false, requiredItemName: keyword.special.name})
          console.log(5)
        }
        if (!keywordActivation) {
        console.log(6)
        return res.status(404).json({message: "Keyword activation not found"})
    }
    
    console.log(7)
    const hasItem = await Item.findOne({where: {ownerId: playerId, ownerType: "player", name: keywordActivation.requiredItemName}})
    console.log(8)
    //If player doesn't have/no longer has the item, give it to him again
    if (!hasItem) {
        const item = await Item.create({name: special.name, ownerId: playerId, ownerType: "player", keywords: special.keywords, location: "inventory"})
        return res.status(201).json(item)
    }
    if (hasItem) {
        return res.status(200).json({message: true})
    }
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

export const patchToggleKeywordFalse = async (req, res) => {
    const { keywordId } = req.params
    console.log(keywordId, " keywordId")
    const playerKeywordActivation = await PlayerKeywordActivation.findByPk(keywordId)
    if (!playerKeywordActivation) {
        return res.status(404).json({message: "PlayerKeywordActivation not found"})
    }
    await playerKeywordActivation.update({activated: false})
    return res.status(200).json({message: "PlayerKeywordActivation toggled to false"})
}