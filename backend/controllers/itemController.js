import { npcDTO } from "../models/dtos/npcDTO.js";
import { Item } from "../models/item.js";
import { wss } from "../server.js";


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
          { ownerId: playerId, ownerType: "player" },
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

export const postNewItem = async (req, res) => {
  try {
    const item = await Item.create({
      name: "Twohanded Sword",
      ownerId: 1,
      ownerType: "area"
    })
    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({message: "Internal error"})
  }
}
