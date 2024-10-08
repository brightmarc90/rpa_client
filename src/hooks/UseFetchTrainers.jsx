import { useEffect, useState } from "react"
import { getTrainers } from "../services/api/trainer"

const UseFetchTrainers = () => {
    const [trainers, setTrainers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const execAsync = async () => {
            try {
                setLoading(true)
                const response = await getTrainers()
                setTrainers(response.data.data)
            } catch (err) {
                setError(err?.message)
            } finally {
                setLoading(false)
            }
        }
        execAsync()
    }, [])
    
  return {trainers, loading, error}
}

export default UseFetchTrainers