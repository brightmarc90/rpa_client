import { publicInstance } from "./instance"

export async function getSubjects() {
    const response = await publicInstance.get("/subjects")
    return response
}