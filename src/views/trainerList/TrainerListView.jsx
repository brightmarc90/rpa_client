import { useEffect, useState } from "react";
import { getTrainers } from "../../services/api/trainer";
import ListPagination from "../../components/listPagination/ListPagination";

function TrainerListView() {
  const [trainerList, setTrainerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const execAsync = async (skip, limit) => {
    try {
      setLoading(true);
      const response = await getTrainers(skip, limit);
      setResponseData(response.data);
      setTrainerList(response.data.data);
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
    execAsync(skip, limit)
  }

  return (
    <div>
      <h1>Liste des formateurs</h1>
      <div>
        {loading && <p>Chargement en cours ...</p>}
        {trainerList.length == 0 && !loading && <p>Aucun résultat</p>}
        {trainerList.length > 0 && (
          <>
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
                    <td>{index + 1}</td>
                    <td>{trainer.name}</td>
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
  );
}

export default TrainerListView;
