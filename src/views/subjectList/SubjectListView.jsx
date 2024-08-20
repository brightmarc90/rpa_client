import { useEffect, useState } from "react";
import { getSubjects } from "../../services/api/subject";

function SubjectListView() {
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    const execAsync = async () => {
      try {
        const response = await getSubjects();
        setSubjectList(response.data);
      } catch (error) {
        const message = error?.message;
        if (message) console.log(message);
      }
    };
    execAsync();
  }, []);
  return (
    <div>
      <h1>Liste des matières</h1>
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
                  <td>{index + 1}</td>
                  <td>{school.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {subjectList.length == 0 && <p>Aucun résultat</p>}
    </div>
  );
}

export default SubjectListView;
