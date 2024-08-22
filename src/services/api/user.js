import { publicInstance } from "./instance"

export async function getUsers() {
    const response = await publicInstance.get("/users")
    return response
}