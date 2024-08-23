import { publicInstance } from "./instance"

export async function getRoles() {
    const response = await publicInstance.get("/roles")
    return response
}