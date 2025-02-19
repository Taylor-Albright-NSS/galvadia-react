const api = "http://localhost:3000"

export const fetchDirectionToUnlock = async (areaId, direction) => {
    console.log(areaId, " AREA ID")
    console.log(direction, " DIRECTION")
    const response = await fetch(`${api}/area/${areaId}/unlock`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({direction})
    })
    const data = await response.json()
    console.log(data, " updated area")
    return data
}