const api = "http://localhost:3000"

export const fetchDirectionToUnlock = async (areaId, direction) => {
    const response = await fetch(`${api}/area/${areaId}/unlock`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({direction})
    })
    const data = await response.json()
    return data
}