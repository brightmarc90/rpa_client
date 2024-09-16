import { publicInstance } from "./instance"

export async function getSchools(skip, limit) {
    let uri = ""
    uri += skip? `skip=${skip}&` : ""
    uri += limit? `limit=${limit}&` : ""
    const response = await publicInstance.get(`/schools?${uri}`)
    return response
}