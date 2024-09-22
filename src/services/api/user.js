import { publicInstance } from "./instance"

export async function getUsers(skip, limit) {
    let uri = ""
    uri += skip? `skip=${skip}&` : ""
    uri += limit? `limit=${limit}&` : ""
    const response = await publicInstance.get(`/users?${uri}`)
    return response
}