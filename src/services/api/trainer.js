import { publicInstance } from "./instance"

export async function getTrainers() {
    const response = await publicInstance.get("/trainers")
    return response
}