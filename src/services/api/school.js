import { publicInstance } from "./instance"

export async function getSchools() {
    const response = await publicInstance.get("/schools")
    return response
}