import { useEffect, useState } from "react";
import { getSubjects } from "../../services/api/subject";
import ListPagination from "../../components/listPagination/ListPagination";

function SubjectListView() {
  const [subjectList, setSubjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null)
  const [listIndex, setListIndex] = useState(0)

  const execAsync = async (skip, limit) => {
    try {
      setLoading(true)
      const response = await getSubjects(skip, limit);
      setResponseData(response.data)
      setSubjectList(response.data.data);
    } catch (err) {
      setError(err?.message);
      if (error) console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    execAsync(0, 10);
  }, []);

  const changePage = (skip, limit) => {
    setListIndex(skip)
    execAsync(skip, limit)
  }

  return (
    <div>
      <h1>Liste des matières</h1>
      { loading && <p>Chargement en cours ...</p>}
      { (subjectList.length == 0 && !loading ) && <p>Aucun résultat</p>}
      {subjectList.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
              </tr>
            </thead>
            <tbody>
              {subjectList.map((school, index) => (
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

export default SubjectListView;
