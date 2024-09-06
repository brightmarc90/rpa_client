import { useEffect, useState } from "react";
import { getInvoices } from "../../services/api/invoice";

function InvoiceListView() {
  const [queryResponse, setQueryResponse] = useState({});
  const [invoiceList, setInvoiceList] = useState([]);
  useEffect(() => {
    const execAsync = async () => {
      try {
        const response = await getInvoices();
        setQueryResponse(response)
        setInvoiceList(queryResponse.data.data);
        console.log(invoiceList);
      } catch (error) {
        const message = error?.message;
        if (message) console.log(message);
      }
    };
    execAsync();
  }, []);

  return (
    <div>
      <h1>Liste des factures</h1>
      <div>les filtres</div>
      <div>
        {invoiceList.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>N° facture</th>
                <th>Date d&apos;émission</th>
                <th>Libellé</th>
                <th>Montant TTC</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceList.map((invoice, index) => (
                <tr key={invoice.invoice_number}>
                  <td>{index + 1}</td>
                  <td>{invoice.invoice_number}</td>
                  <td>{new Date(invoice.issue_date).toLocaleString("fr-FR", {day: "numeric", month: "numeric", year: "numeric"})}</td>
                  <td>{`${invoice.school.name} - ${invoice.trainer.name} - ${invoice.subject.name}`}</td>
                  <td>{invoice.amount_ttc}</td>
                  <td><button>Voir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {invoiceList.length == 0 && <p>Aucun résultat</p>}
      </div>
    </div>
  );
}

export default InvoiceListView;
