import { NavLink, Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <>
        <nav>
            <ul>
                <li><NavLink to={"/schools"}>Ecoles</NavLink> </li>
                <li><NavLink to={"/trainers"}>Formateurs</NavLink> </li>
                <li><NavLink to={"/subjects"}>Matières</NavLink> </li>
                <li><NavLink to={"/"}>Factures</NavLink> </li>
            </ul>
            <ul>
                <li><NavLink to={"/"}>Rôles</NavLink> </li>
                <li><NavLink to={"/"}>Utilisateurs</NavLink> </li>
            </ul>
        </nav>
        <main>
            <Outlet />
        </main>
    </>
  )
}

export default AppLayout