import { useEffect, useState } from "react";
import { getTrainers } from "../../services/api/trainer";

function TrainerListView() {
  const [trainerList, setTrainerList] = useState([]);

  useEffect(() => {
    const execAsync = async () => {
      try {
        const response = await getTrainers();
        setTrainerList(response.data);
      } catch (error) {
        const message = error?.message;
        if (message) console.log(message);
      }
    };
    execAsync();
  }, []);

  return (
    <div>
      <h1>Liste des formateurs</h1>
      <div>
        {trainerList.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
              </tr>
            </thead>
            <tbody>
                {trainerList.map((trainer, index) => (
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{trainer.name}</td>
                  </tr>
                ))}              
            </tbody>
          </table>
        )}
        {
            trainerList.length == 0 && <p>Aucun résultat</p>
        }
      </div>
    </div>
  );
}

export default TrainerListView;
