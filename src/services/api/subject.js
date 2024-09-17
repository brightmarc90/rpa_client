import { publicInstance } from "./instance"

export async function getSubjects(skip, limit) {
    let uri = ""
    uri += skip? `skip=${skip}&` : ""
    uri += limit? `limit=${limit}&` : ""
    const response = await publicInstance.get(`/subjects?${uri}`)
    return response
}