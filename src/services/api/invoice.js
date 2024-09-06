import { publicInstance } from "./instance"

export async function getInvoices() {
    const response = await publicInstance.get("/invoices/filters")
    return response
}