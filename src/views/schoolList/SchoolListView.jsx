import { useEffect, useState } from "react";
import { getSchools } from "../../services/api/school";

function SchoolListView() {
  const [schoolList, setSchoolList] = useState([]);

  useEffect(() => {
    const execAsync = async () => {
        try {
            const response = await getSchools();
            setSchoolList(response.data);
        } catch (error) {
            const message = error?.message;
            if (message) console.log(message);
        }
    }
    execAsync();
  }, []);

  return (
    <div>
      <h1>Liste des écoles</h1>
      {schoolList.length > 0  && (
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
                    <td>{index+1}</td>
                    <td>{school.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {
        schoolList.length == 0 && <p>Aucun résultat</p>
      }
    </div>
  );
}

export default SchoolListView;
