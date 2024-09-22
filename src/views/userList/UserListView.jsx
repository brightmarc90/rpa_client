import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/api/user";
import ListPagination from "../../components/listPagination/ListPagination";

function UserListView() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [listIndex, setListIndex] = useState(0);

  const execAsync = async (skip, limit) => {
    try {
      setLoading(true);
      const response = await getUsers(skip, limit);
      setResponseData(response.data);
      setUserList(response.data.data);
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
      <h1>Liste des utilisateurs</h1>
      <div>
        <div>
          <Link to={"/"}>Nouvel utilisateur</Link>
        </div>
        <div>
          {loading && <p>Chargement en cours ...</p>}
          {userList.length == 0 && !loading && <p>Aucun résultat</p>}
          {userList.length > 0 && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, index) => (
                    <tr key={index}>
                      <td>{ listIndex + index + 1}</td>
                      <td>{user.firstname + " " + user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.role.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ListPagination
                count={responseData.total}
                limit={responseData.limit}
                changePage={changePage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserListView;
