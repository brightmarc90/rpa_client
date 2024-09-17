import { useEffect, useState } from "react";
import { getSchools } from "../../services/api/school";
import ListPagination from "../../components/listPagination/ListPagination";

function SchoolListView() {
  const [schoolList, setSchoolList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null)
  const [listIndex, setListIndex] = useState(0)

  const execAsync = async (skip, limit) => {
    try {
        setLoading(true)
        const response = await getSchools(skip, limit);
        setResponseData(response.data)
        setSchoolList(response.data.data);
    } catch (err) {
        setError(err?.message);
        if (error) console.log(error);
    } finally {
        setLoading(false)
    }
    }

  useEffect(() => {
    execAsync(0, 10);
  }, []);

  const changePage = (skip, limit) => {
    setListIndex(skip)
    execAsync(skip, limit)
  }

  return (
    <div>
      <h1>Liste des écoles</h1>
      { loading && <p>Chargement en cours ...</p>}
      { (schoolList.length == 0 && !loading ) &&<p>Aucun résultat</p> }
      { schoolList.length > 0  && (
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
              </tr>
            </thead>
            <tbody>
                {schoolList.map((school, index) => (
                    <tr key={index}>
                    <td>{listIndex + index + 1}</td>
                    <td>{school.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ListPagination count={responseData.total} limit={responseData.limit} changePage={changePage} />
        </div>
      )}
    </div>
  );
}

export default SchoolListView;
