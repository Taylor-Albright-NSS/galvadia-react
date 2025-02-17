import { useEffect, useState } from "react";
import { getPlayer1 } from "../../managers/testFetch";
import { zGameContext } from "./zGameContext";
import { getCurrentArea } from "../../managers/areas";

export const GameProvider = ({ children }) => {
    const [player, setPlayer] = useState({});
    const [currentArea, setCurrentArea] = useState({});
    const [npcs, setNpcs] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [windowLogs, setWindowLogs] = useState([])
    
    const addLog = (message) => {
        setWindowLogs(prev => [...prev, message])
    }

  useEffect(() => {
    const fetchData = async () => {
        const player = await getPlayer1()
        setPlayer(player)
        const area = await getCurrentArea(player.area_id)
        setCurrentArea(area)
    }
    fetchData()
  }, [player.area_id])

  return (
    <zGameContext.Provider value={{ player, setPlayer, currentArea, setCurrentArea, npcs, setNpcs, enemies, setEnemies, windowLogs, addLog }}>
      {children}
    </zGameContext.Provider>
  );
};
