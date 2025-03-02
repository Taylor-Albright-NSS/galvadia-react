import { useEffect, useMemo, useRef, useState } from "react";
import { getPlayer1 } from "../../managers/testFetch";
import { zGameContext } from "./zGameContext";
import { fetchCurrentArea } from "../../managers/areas";
import { fetchEnemiesInRoom } from "../../fetches/enemies/enemies";
import { areaDisplay } from "../../managers/areaDisplay";
import { fetchCurrentAreaNpcs } from "../../fetches/npcs/npcs";
import { fetchCurrentAreaItems, fetchEveryItem } from "../../fetches/items/items";
import { fetchPlayersInRoom } from "../../fetches/players/players";

export const GameProvider = ({ children }) => {
  const playerStatus = useRef({
    isTalking: false,
    isInCombat: false,
    isSwinging: false,
    isAdvancing: false,
    isRetreating: false,
    isResting: false,
  })
  // const [playerId, setPlayerId] = useState(null)
  const [player, setPlayer] = useState({});
  const [currentArea, setCurrentArea] = useState({});
  const [npcs, setNpcs] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [items, setItems] = useState([])
  const [playerItems, setPlayerItems] = useState([])
  const [windowLogs, setWindowLogs] = useState([])
  const [players, setPlayers] = useState([])

  const addLog = (message) => {
    console.log(message)
      setWindowLogs(prev => [...prev, message])
  }

  const contextValue = useMemo(() => ({
    player, setPlayer, currentArea, setCurrentArea,
    npcs, setNpcs, enemies, setEnemies,
    items, setItems, windowLogs, setWindowLogs,
    addLog, playerItems, setPlayerItems, players,
    setPlayers, playerStatus
  }), [player, currentArea, npcs, enemies, items, windowLogs, playerItems, players])

  useEffect(() => {
     (async () => {
        const player = await getPlayer1()
        setPlayer(player)
      })()
  }, [])


  useEffect(() => {
    const updateAll = async () => {
      let enemies
      let npcs
      let items
      let players
      let areaId = !player.area_id ? 1 : player.area_id
      let playerId = player.id
      const area = await fetchCurrentArea(areaId)
      setCurrentArea(area)
  
      enemies = await fetchEnemiesInRoom(areaId)
      setEnemies(enemies)
  
      npcs = await fetchCurrentAreaNpcs(areaId)
      setNpcs(npcs)
      console.log(npcs)
      
      items = await fetchCurrentAreaItems(areaId)
      setItems(items)

      players = await fetchPlayersInRoom(areaId, playerId)
      setPlayers(players)
      
      addLog(areaDisplay(area, enemies, npcs, items, players))
    }
    updateAll()
  }, [player.area_id])

  return (
    <zGameContext.Provider value={contextValue}>
      {children}
    </zGameContext.Provider>
  );
};
