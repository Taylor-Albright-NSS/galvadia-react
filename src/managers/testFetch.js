const api = "http://localhost:5000"

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