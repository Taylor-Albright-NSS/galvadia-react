import { useEffect, useMemo, useRef, useState } from "react";
import { getPlayer1 } from "../../fetches/players/players";
import { zGameContext } from "./zGameContext";
import { fetchCurrentArea } from "../../fetches/areas/areas";
import { fetchEnemiesInRoom } from "../../fetches/enemies/enemies";
import { areaDisplay } from "../../DOMrenders/areaDisplay";
import { fetchCurrentAreaNpcs } from "../../fetches/npcs/npcs";
import { fetchAllItemsThatBelongToPlayer, fetchCurrentAreaItems } from "../../fetches/items/items";
import { fetchPlayersInRoom } from "../../fetches/players/players";

export const GameProvider = ({ children }) => {

  const [gameData, setGameData] = useState({
    player: {},
    currentArea: {},
    npcs: [],
    enemies: [],
    items: [],
    playerItems: [],
    players: []
  })

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

  const contextValue = {
    player, setPlayer, currentArea, setCurrentArea,
    npcs, setNpcs, enemies, setEnemies,
    items, setItems, windowLogs, setWindowLogs,
    addLog, playerItems, setPlayerItems, players,
    setPlayers, playerStatus
  }

  

  useEffect(() => {
    const updateAll = async () => {
      try {
        const player = await getPlayer1();
        const areaId = player.area_id;
        const playerId = player.id;
  
        const [area, enemies, npcs, items, playerItems, players] = await Promise.all([
          fetchCurrentArea(areaId),
          fetchEnemiesInRoom(areaId),
          fetchCurrentAreaNpcs(areaId),
          fetchCurrentAreaItems(areaId),
          fetchAllItemsThatBelongToPlayer(playerId),
          fetchPlayersInRoom(areaId, playerId),
        ]);
  
        setGameData({
          player,
          currentArea: area,
          npcs,
          enemies,
          items,
          playerItems,
          players
        });
  
        addLog(areaDisplay(area, enemies, npcs, items, players));
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };
  
    updateAll();
  }, [gameData.player.area_id]);

  // useEffect(() => {
  //   const updateAll = async () => {
  //     try {
  //       const player = await getPlayer1();
  //       setPlayer(player);
  
  //       const areaId = player.area_id
  //       const playerId = player.id;
  
  //       const [area, enemies, npcs, items, playerItems, players] = await Promise.all([
  //         fetchCurrentArea(areaId),
  //         fetchEnemiesInRoom(areaId),
  //         fetchCurrentAreaNpcs(areaId),
  //         fetchCurrentAreaItems(areaId),
  //         fetchAllItemsThatBelongToPlayer(playerId),
  //         fetchPlayersInRoom(areaId, playerId),
  //       ]);
  
  //       setCurrentArea(area);
  //       setEnemies(enemies);
  //       setNpcs(npcs);
  //       setItems(items);
  //       setPlayerItems(playerItems);
  //       setPlayers(players);
  
  //       addLog(areaDisplay(area, enemies, npcs, items, players));
  //     } catch (error) {
  //       console.error("Error updating data:", error);
  //     }
  //   };
  
  //   updateAll();
  // }, [player.area_id]);

  return (
    <zGameContext.Provider value={contextValue}>
      {children}
    </zGameContext.Provider>
  );
};
