const api = "http://localhost:3000"

export const testFetch = async () =>{
    const response = await fetch(`${api}`)
    const data = await response.json()
    console.log(data.message)
}
export const testFetch2 = async () =>{
    const response = await fetch(`${api}/api`)
    const data = await response.json()
    console.log(data.message)
}
export const getPlayers = async () =>{
    const response = await fetch(`${api}/players`)
    const data = await response.json()
    console.log(data)
}

