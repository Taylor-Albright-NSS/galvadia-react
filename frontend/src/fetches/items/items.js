const api = "http://localhost:3000"

export const fetchEveryItem = async () => {
    const response = await fetch(`${api}/items`)
    const data = await response.json()
    return data
}

export const fetchCurrentAreaItems = async (areaId) => {
    const response = await fetch(`${api}/items/area/${areaId}`)
    const data = await response.json()
    return data
}
//
export const fetchCurrentAreaItemsToPlayer = async (itemsArray, playerId) => {
    try {
        //Backend endpoint
        //app.put('/items', putCurrentAreaItemsToPlayer)
        const response = await fetch(`${api}/items?playerId=${playerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemsArray)
        })
        if (!response.ok) {
            throw new Error(`No items to pick up`)
        }
        const data = await response.json()
        return data
    } catch(error) {
        console.error(`No items to pick up`)
    }
}


//

export const fetchAllItemsThatBelongToPlayer = async (playerId) => {
    const response = await fetch(`${api}/items/player/${playerId}`)
    const data = await response.json()
    return data
}

export const fetchCreateItem = async () => {
    const response = await fetch(`${api}/item`, {method: "POST"})
    const data = await response.json()
    return data
}

//Spawns item in the room the player is in
export const fetchCreateTwohandedSword = async (areaId) => {
    const response = await fetch(`${api}/item/twohandedsword/${areaId}`, {method: "POST"})
    const data = await response.json()
    console.log(data)
    return data
}
export const fetchCreateOnehandedSword = async (areaId) => {
    const response = await fetch(`${api}/item/onehandedsword/${areaId}`, {method: "POST"})
    const data = await response.json()
    return data
}
export const fetchCreateDagger = async (areaId) => {
    const response = await fetch(`${api}/item/dagger/${areaId}`, {method: "POST"})
    const data = await response.json()
    return data
}
export const fetchCreateCrossbow = async (areaId) => {
    const response = await fetch(`${api}/item/crossbow/${areaId}`, {method: "POST"})
    const data = await response.json()
    return data
}

export const fetchDeleteAllItems = async () => {
    const response = await fetch(`${api}/items`, {method: "DELETE"})
    const data = await response.json()
    return data
}

export const fetchPlayerUnpacksItem = async (playerId, itemId) => {
    try {
        const response = await fetch(`${api}/item/unpack/${playerId}/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error({message: "Not sure what's going on"})
        }
        const data = await response.json()
        return data
    } catch(error) {
        console.error(`Internal error: `, error.message)
    }
}
export const fetchPlayerPacksItem = async (playerId, itemId) => {
    try {
        const response = await fetch(`${api}/item/pack/${playerId}/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error({message: "Not sure what's going on"})
        }
        const data = await response.json()
        return data
    } catch(error) {
        console.error(`Internal error: `, error.message)
    }
}

export const fetchPlayerDropsItem = async (areaId, itemId) => {
    try {
        const response = await fetch(`${api}/item/drop/${areaId}/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error({message: "Error dropping item"})
        }
        const data = await response.json()
        return data
    } catch(error) {
        console.error(`Error: `, error.message)
    }
}