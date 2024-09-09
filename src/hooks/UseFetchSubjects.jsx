import { useEffect, useState } from "react"
import { getSubjects } from "../services/api/subject"

const UseFetchSubjects = () => {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const execAsync = async () => {
            try {
                setLoading(true)
                const response = await getSubjects()
                if(!response.ok){
                    throw new Error("Erreur de récupération")
                }
                const data = await response.json()
                setSubjects(data)
            } catch (err) {
                setError(err?.message)
            } finally {
                setLoading(false)
            }
        }
        execAsync()
    }, [])
    
  return {subjects, loading, error}
}

export default UseFetchSubjects