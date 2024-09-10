import { publicInstance } from "./instance"

export async function getInvoices() {
    const response = await publicInstance.get("/invoices/filters")
    return response
}

export async function getInvoicesBy(filters) {
    let uri = ""
    uri += filters.school? `school=${filters.school}&` : ""
    uri += filters.trainer? `trainer=${filters.trainer}&` : ""
    uri += filters.subject? `subject=${filters.subject}&` : ""
    uri += filters.year? `year=${filters.year}&` : ""
    uri += filters.start_date? `issue_date=${filters.start_date}&` : ""
    uri += filters.end_date? `end_date=${filters.end_date}&` : ""
    const response = await publicInstance.get(`/invoices/filters?${uri}`)
    return response
}