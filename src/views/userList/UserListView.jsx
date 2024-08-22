import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/api/user";

function UserListView() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const execAsync = async () => {
      try {
        const response = await getUsers();
        setUserList(response.data);
      } catch (error) {
        const message = error?.message;
        if (message) console.log(message);
      }
    };
    execAsync();
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <div>
        <div>
          <Link to={"/"}>Nouvel utilisateur</Link>
        </div>
        <div>
          {userList.length > 0 && (
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
                    <td>{index+1}</td>
                    <td>{user.firstname+" "+user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserListView;
