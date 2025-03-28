import { useEffect, useMemo, useRef, useState } from "react";
import { getPlayer1, getPlayer2 } from "../../fetches/players/players";
import { zGameContext } from "./zGameContext";
import { fetchCurrentArea } from "../../fetches/areas/areas";
import { fetchEnemiesInRoom } from "../../fetches/enemies/enemies";
import { areaDisplay } from "../../DOMrenders/areaDisplay";
import { fetchCurrentAreaNpcs } from "../../fetches/npcs/npcs";
import { fetchAllItemsThatBelongToPlayer, fetchCurrentAreaItems } from "../../fetches/items/items";
import { fetchPlayersInRoom } from "../../fetches/players/players";

export const GameProvider = ({ children }) => {

  const [windowLogs, setWindowLogs] = useState([])
  const [gameData, setGameData] = useState({
    player: {},
    currentArea: {},
    npcs: [],
    enemies: [],
    items: [],
    playerItems: [],
    players: [],
  })

  const playerStatus = useRef({
    isTalking: false,
    isInCombat: false,
    isSwinging: false,
    isAdvancing: false,
    isRetreating: false,
    isResting: false,
  })

  const addLog = (message) => {
    setWindowLogs(prev => [...prev, message])
  }

  // [message, color]
  // const customizeEachWord = function(messageCollection) {
  //   const [message, color] = messageCollection
  //   // const classOrClassArray = addClass
  //   let span = document.createElement('span') //string 1
  //   span.textContent = message
  //   if (Array.isArray(classOrClassArray)) {
  //     classOrClassArray.forEach(classToAdd => span.classList.add(classToAdd))
  //   } else {
  //     span.classList.add(classOrClassArray)
  //   }
  //   line.appendChild(span)
  //   masterArea.appendChild(line)
  //   updateScroll()
  // }


  const contextValue = { gameData, setGameData, playerStatus, windowLogs, addLog }

  useEffect(() => {
    const updateAll = async () => {
      try {
        console.log(gameData)
        let player
        if (!gameData.player) {player = await getPlayer1()}
        if (gameData.player.id == 1) {player = await getPlayer1()}
        if (gameData.player.id == 2) {player = await getPlayer2()}
        
        const [area, enemies, npcs, items, playerItems, players] = await Promise.all([
          fetchCurrentArea(player.area_id,),
          fetchEnemiesInRoom(player.area_id),
          fetchCurrentAreaNpcs(player.area_id, player.id),
          fetchCurrentAreaItems(player.area_id),
          fetchAllItemsThatBelongToPlayer(player.id),
          fetchPlayersInRoom(player.area_id, player.id),
        ])
  
        setGameData({
          player,
          currentArea: area,
          npcs,
          enemies,
          items,
          playerItems,
          players
        })
        addLog(areaDisplay(area, enemies, npcs, items, players))
      } catch (error) {
        console.error("Error updating data:", error)
      }
    };
    updateAll();
  }, [gameData.player.area_id]);

  return (
    <zGameContext.Provider value={contextValue}>
      {children}
    </zGameContext.Provider>
  );
};
