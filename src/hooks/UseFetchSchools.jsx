import { useEffect, useState } from "react"
import { getSchools } from "../services/api/school"

const UseFetchSchools = () => {
    const [schools, setSchools] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const execAsync = async () => {
            try {
                setLoading(true)
                const response = await getSchools()
                setSchools(response.data.data)
            } catch (err) {
                setError(err?.message)
            } finally {
                setLoading(false)
            }
        }
        execAsync()
    }, [])
    
  return {schools, loading, error}
}

export default UseFetchSchools