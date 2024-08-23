import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getRoles } from "../../services/api/role"

function RoleListView() {
    const [roleList, setRoleList] = useState([])
    useEffect(() => {
        const execAsync = async () => {
            try {
                const response = await getRoles()
                setRoleList(response.data)
            } catch (error) {
                const message = error?.message
                if (message) console.log(message)
            }
        }
        execAsync()
    }, [])
    
    return (
    <div>
        <h1>Liste des rôles</h1>
        <div>
            <div>
                <Link to={"/"}>Nouveau rôle</Link>
            </div>
            <div>
                {
                    roleList.length > 0 && 
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                roleList.map((role, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{role.name}</td>
                                    </tr>
                                ))
                            }                            
                        </tbody>
                    </table>
                } 
                {
                    roleList.length == 0 && <p>Aucun résultat</p>
                }               
            </div>
        </div>
    </div>
  )
}

export default RoleListView