import { useEffect, useState } from "react";
import { getInvoices, getInvoicesBy } from "../../services/api/invoice";
import InvoiceFilters from "../../components/invoiceFilters/InvoiceFilters";
import InvoiceView from "../invoiceView/InvoiceView";
import ListPagination from "../../components/listPagination/ListPagination";

function InvoiceListView() {
    const [responseData, setResponseData] = useState(null)
    const [filters, setFilters] = useState({})
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const execAsync = async () => {
      try {
        setLoading(true);
        const response = await getInvoices();
        setResponseData(response.data)
        setInvoiceList(response.data.data);
      } catch (err) {
        setError(err?.message);
        if (error) console.log(error);
      } finally {
        setLoading(false);
      }
    };
    execAsync();
    console.log(responseData)
  }, []);

  const applyFilters = (filtersObj, skip, limit) => {
    console.log(skip, limit)
    const execAsync = async () => {
      try {
        setLoading(true);
        const response = await getInvoicesBy(filtersObj, skip, limit);
        setResponseData(response.data)
        setInvoiceList(response.data.data);
      } catch (err) {
        const errResponse = err?.response;
        if (errResponse?.data) {
          setError(errResponse.data);
          setInvoiceList([]);
        }
      } finally {
        setLoading(false);
        setFilters(filtersObj)
      }
    };
    execAsync();
    console.log(filters)
  };

  const handlePreview = (invoice_number) => {
    setSelectedRow(selectedRow === invoice_number ? null : invoice_number);
  };

  const changePage = (skip, limit) => {
    applyFilters(filters, skip, limit)
  }

  return (
    <div>
      <h1>Liste des factures</h1>
      <div>
        <InvoiceFilters applyFilters={applyFilters} />
      </div>
      <div>
        {loading && <p>Chargement en cours ...</p>}
        {invoiceList.length == 0 && !loading && <p>Aucun résultat</p>}
        {invoiceList.length > 0 && (
          <>
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
                    <td>
                      {new Date(invoice.issue_date).toLocaleString("fr-FR", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td>{`${invoice.school.name} - ${invoice.trainer.name} - ${invoice.subject.name}`}</td>
                    <td>{invoice.amount_ttc}</td>
                    <td>
                      <button
                        onClick={() => handlePreview(invoice.invoice_number)}
                      >
                        Voir
                      </button>
                      {selectedRow === invoice.invoice_number && (
                        <InvoiceView invoice={invoice} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ListPagination count={responseData.total} limit={responseData.limit} changePage={changePage} />
          </>
        )}
      </div>
    </div>
  );
}

export default InvoiceListView;
