import { formatDate } from "../../helpers/utils"

/* eslint-disable react/prop-types */
const InvoiceView = ({invoice}) => {
    const {start_date, end_date} = invoice.intervention_dates
    let dateString = ""
    if(start_date == end_date)
        dateString = formatDate(start_date)
    else
        dateString = `${formatDate(start_date)} - ${formatDate(end_date)}`
  return (
    <div>
        <h3>Facture N° {invoice.invoice_number}</h3>
        <p>{`${invoice.school.name} - ${invoice.trainer.name} - ${invoice.subject.name} - ${dateString} - Effectif ${invoice.workforce}`}</p>
        <p>
            <span>Date d&apos;émission : {formatDate(invoice.issue_date)}</span> <span>Règlement : {invoice.payment_due}</span>
        </p>
        <table>
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th>Quantité</th>
                    <th>Unité</th>
                    <th>Prix unitaire</th>
                    <th>TVA</th>
                    <th>Montant HT</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{invoice.invoice_wording}</td>
                    <td>{invoice.days_count? invoice.days_count : invoice.hours_count}</td>
                    <td>{invoice.days_count? "Jours": "Heures"}</td>
                    <td>{invoice.unit_price}</td>
                    <td>{invoice.tva? invoice.tva : "0%"}</td>
                    <td>{invoice.amount_ht}</td>
                </tr>
            </tbody>
        </table>
        <p>Total HT: {invoice.amount_ht} €</p>
        <p>Total TTC: {invoice.amount_ttc} €</p>
    </div>
  )
}

export default InvoiceView