import { useEffect, useMemo, useState } from "react";
import { getPlayer1 } from "../../managers/testFetch";
import { zGameContext } from "./zGameContext";
import { fetchCurrentArea } from "../../managers/areas";
import { fetchEnemiesInRoom } from "../../fetches/enemies/enemies";
import { areaDisplay } from "../../managers/areaDisplay";
import { fetchCurrentAreaNpcs } from "../../fetches/npcs/npcs";
import { fetchCurrentAreaItems, fetchEveryItem } from "../../fetches/items/items";
import { socket } from "../../websocket";
import { useFormState } from "react-dom";

export const GameProvider = ({ children }) => {
  const [playerId, setPlayerId] = useState(null)
  const [player, setPlayer] = useState({});
  const [currentArea, setCurrentArea] = useState({});
  const [npcs, setNpcs] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [items, setItems] = useState([])
  const [playerItems, setPlayerItems] = useState([])
  const [windowLogs, setWindowLogs] = useState([])
  const addLog = (message) => {
      setWindowLogs(prev => [...prev, message])
  }


  
  const contextValue = useMemo(() => ({
    player, setPlayer, currentArea, setCurrentArea,
    npcs, setNpcs, enemies, setEnemies,
    items, setItems, windowLogs, setWindowLogs,
    addLog, playerItems, setPlayerItems
  }), [player, currentArea, npcs, enemies, items, windowLogs, playerItems])

  useEffect(() => {
    const fetchData = async () => {
      let enemies
      let npcs
      let items
      const player = await getPlayer1()
      setPlayer(player)
      setPlayerId(player.id)
      setPlayerItems(player.items.sort())

      const area = await fetchCurrentArea(player.area_id)
      setCurrentArea(area)

      enemies = await fetchEnemiesInRoom(player.area_id)
      setEnemies(enemies)

      npcs = await fetchCurrentAreaNpcs(player.area_id)
      setNpcs(npcs)

      items = await fetchCurrentAreaItems(player.area_id)
      setItems(items)

      addLog(areaDisplay(area, enemies, npcs, items))
    }
    fetchData()
  }, [player.area_id])
  
  useEffect(() => {
    if (player.id) {
      if (socket.readyState === WebSocket.OPEN) {
        addLog("SOCKET ALREADY OPEN -> SENDING NOW")
        socket.send(JSON.stringify({ type: "join", playerId: playerId }))
      }
      socket.onopen = () => {
        addLog("SOCKET OPEN -> SENDING NOW")
        socket.send(JSON.stringify({ type: "join", playerId: playerId}));
      }
    }
  }, [player.id])




  return (
    <zGameContext.Provider value={contextValue}>
      {children}
    </zGameContext.Provider>
  );
};
