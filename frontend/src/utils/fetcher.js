export const fetchJSON = async(URI) => {
  return await fetch(`${window.location}rps/${URI}`).then(response => {
    return response.json()
  })
}