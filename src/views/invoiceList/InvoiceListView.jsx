import { useEffect, useState } from "react";
import { getInvoices, getInvoicesBy } from "../../services/api/invoice";
import InvoiceFilters from "../../components/invoiceFilters/InvoiceFilters";

function InvoiceListView() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const execAsync = async () => {
      try {
        setLoading(true)
        const response = await getInvoices();
        setInvoiceList(response.data.data);
      } catch (err) {
        setError(err?.message);
        if (error) console.log(error);
      } finally {
        setLoading(false)
      }
    };
    execAsync();
  }, []);

  const applyFilters = (filters) => {
    const execAsync = async () => {
        try {
            setLoading(true)
            const response = await getInvoicesBy(filters)
            setInvoiceList(response.data.data);
        } catch (err) {
            const errResponse = err?.response
            if(errResponse?.data){
                setError(errResponse.data);
                setInvoiceList([])
            }
        } finally {
            setLoading(false)
        }
    }
    execAsync()
  }

  return (
    <div>
      <h1>Liste des factures</h1>
      <div>
        <InvoiceFilters applyFilters={applyFilters}/>
      </div>
      <div>
        {loading && <p>Chargement en cours ...</p>}
        {(invoiceList.length == 0 && !loading) && <p>Aucun résultat</p>}
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
      </div>
    </div>
  );
}

export default InvoiceListView;
