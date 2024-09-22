import { useEffect, useState } from "react";
import { getRoles } from "../services/api/role";

const UseFetchRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const execAsync = async () => {
      try {
        setLoading(true);
        const response = await getRoles();
        setRoles(response.data.data);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    execAsync();
  }, []);

  return { roles, loading, error };
};

export default UseFetchRoles;
