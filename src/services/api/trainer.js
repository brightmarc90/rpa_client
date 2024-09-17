import { publicInstance } from "./instance"

export async function getTrainers(skip, limit) {
    let uri = ""
    uri += skip? `skip=${skip}&` : ""
    uri += limit? `limit=${limit}&` : ""
    const response = await publicInstance.get(`/trainers?${uri}`)
    return response
}