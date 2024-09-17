import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoles } from "../../services/api/role";
import ListPagination from "../../components/listPagination/ListPagination";

function RoleListView() {
  const [roleList, setRoleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [listIndex, setListIndex] = useState(0);

  const execAsync = async (skip, limit) => {
    try {
      setLoading(true);
      const response = await getRoles(skip, limit);
      setResponseData(response.data);
      setRoleList(response.data.data);
    } catch (err) {
      setError(err?.message);
      if (error) console.log(error);
    } finally {
      setLoading(false);
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
      <h1>Liste des rôles</h1>
      <div>
        <div>
          <Link to={"/"}>Nouveau rôle</Link>
        </div>
        <div>
          {loading && <p>Chargement en cours ...</p>}
          {roleList.length == 0 && !loading && <p>Aucun résultat</p>}
          {roleList.length > 0 && (<>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                </tr>
              </thead>
              <tbody>
                {roleList.map((role, index) => (
                  <tr key={index}>
                    <td>{listIndex + index + 1}</td>
                    <td>{role.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ListPagination count={responseData.total} limit={responseData.limit} changePage={changePage} /></>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoleListView;
