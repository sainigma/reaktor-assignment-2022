export const fetchJSON = async(URI) => {
  return await fetch(`/rps/${URI}`).then(response => {
    return response.json()
  })
}