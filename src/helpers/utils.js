export const formatDate = (newDate) => {
    return new Date(newDate).toLocaleString("fr-FR", {day: "numeric", month: "numeric", year: "numeric"})
}