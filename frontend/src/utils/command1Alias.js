export const command1Alias = (command1) => {
    const command1Alias = {
        n: "north",
        ne: "northeast",
        e: "east",
        se: "southeast",
        s: "south",
        sw: "southwest",
        w: "west",
        nw: "northwest",
        l: "look",
        i: "inventory",
        talk: "speak",
        ex: "examine",
        g: "get",
        
    }
    return command1Alias[command1] || command1
}