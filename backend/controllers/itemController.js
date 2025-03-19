import { npcDTO } from "../models/dtos/npcDTO.js";
import { Item } from "../models/item.js";
import { wss } from "../websocket.js";


export const getItems = async (req, res) => {
  try {
    const items = await Item.findAll()
    res.status(200).json(items)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}
export const getCurrentAreaItems = async (req, res) => {
  const { areaId } = req.params
  try {
    const items = await Item.findAll({where: {ownerId: areaId, ownerType: "area"}})
    res.status(200).json(items)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}
export const putCurrentAreaItemsToPlayer = async (req, res) => {
  console.log(`Current WebSocket Clients: ${wss.clients.size}`);
  try {
    const itemsArray = req.body
    const { playerId } = req.query
    if (itemsArray.length === 0) {
      console.log(`Current WebSocket Clients: ${wss.clients.size}`);
      return res.status(404).json({message: "No items to pick up"})
    }
    console.log(`Current WebSocket Clients: ${wss.clients.size}`);

    const updatedItems = await Promise.all(
      itemsArray.map(async (item) => {
        const updatedItem = await Item.update(
          { ownerId: playerId, ownerType: "player", location: "inventory" },
          { where: { id: item.id }, returning: true }
        );
        return updatedItem;
      })
    );
    console.log(`Current WebSocket Clients: ${wss.clients.size}`);

    wss.clients.forEach(client => {
      console.log("Websocket is OPEN!")
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          event: "itemRemoved",
          pickedBy: playerId
        }));
      }
    });
    
    return res.status(200).json(updatedItems)
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}
export const postSpawnItemToPlayer = async (req, res) => {
  try {
    const { player, keyword } = req.body
    const playerId = player.id
    const { name, keywords } = keyword.special
    const item = await Item.create({name: name, ownerId: playerId, ownerType: "player", keywords: keywords, location: "inventory"})
    console.log(item, " item")
    if (!item) {
      return res.status(500).json({message: "Item failed to be created"})
    }
    return res.status(201).json(item)
  } catch(error) {
    console.log("Duplicate ID?")
    return res.status(500).json({message: "Internal server error. I think it's because of the unique ID contraint"})
  }
}
export const postAreaKeywordSpawn = async (req, res) => {
  const { areaId } = req.params
  const { keywordSpecial } = req.body
  const { name, ownerId, ownerType, keywords } = keywordSpecial
  const item = await Item.create({name: name, ownerId: ownerId, ownerType: ownerType, keywords: keywords})
  if (!item) {
    return res.status(500).json({message: "Item failed to be created"})
  }
  return res.status(201).json(item)
}

export const postNewItem = async (req, res) => { //Dev Window test endpoint
  try {    
    const item = await Item.create({name: "Twohanded Sword", ownerId: 1, ownerType: "area", isTwoHanded: true, keywords: ["twohanded", "sword", "twohanded sword"]})
    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({message: "Internal error"})
  }
}

//--------These functions will spawn a weapon in the room that the player is currently in
export const postTwohandedSword = async (req, res) => {
  const { areaId } = req.params
  console.log(areaId, " areaId")
  try {    
    const item = await Item.create({name: "Twohanded Sword", ownerId: areaId, ownerType: "area", isTwoHanded: true, keywords: ["twohanded", "sword", "twohanded sword"]})
    if (!item) {
      return res.status(400).json({message: "Item could not be created"})
    }
    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({message: "Internal error"})
  }
}

export const postOnehandedSword = async (req, res) => {
  const { areaId } = req.params
  try {    
    const item = await Item.create({name: "Onehanded Sword", ownerId: areaId, ownerType: "area", keywords: ["onehanded", "sword", "onehanded sword"]})
    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({message: "Internal error"})
  }
}
export const postDagger = async (req, res) => {
  const { areaId } = req.params
  try {    
    const item = await Item.create({name: "Dagger", ownerId: areaId, ownerType: "area", keywords: ["dagger"]})
    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({message: "Internal error"})
  }
}

export const postCrossbow = async (req, res) => {
  const { areaId } = req.params
  console.log(areaId, " areaId for crossbow")
  try {    
    const item = await Item.create({name: "Crossbow", ownerId: areaId, ownerType: "area", isTwoHanded: true, keywords: ["crossbow"]})
    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({message: "Internal error"})
  }
}

export const deleteAllItems = async (req, res) => {
  try {
    const allItems = await Item.findAll();
    console.log(allItems)
    if (allItems.length === 0) {
      return res.status(404).json({ message: "All items not found" });
    }
    for (const item of allItems) {
      await item.destroy();
    }
    return res.status(200).json({ message: "All items have been destroyed" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};