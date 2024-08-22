import { NavLink, Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <>
        <nav>
            <ul>
                <li><NavLink to={"/"}>Tableau de bord</NavLink> </li>
                <li><NavLink to={"/schools"}>Ecoles</NavLink> </li>
                <li><NavLink to={"/trainers"}>Formateurs</NavLink> </li>
                <li><NavLink to={"/subjects"}>Matières</NavLink> </li>
                <li><NavLink to={"/"}>Factures</NavLink> </li>
                <li><NavLink to={"/"}>Bilan Péda. et Fin.</NavLink> </li>
            </ul>
            <ul>
                <li><NavLink to={"/"}>Rôles</NavLink> </li>
                <li><NavLink to={"/users"}>Utilisateurs</NavLink> </li>
            </ul>
        </nav>
        <main>
            <Outlet />
        </main>
    </>
  )
}

export default AppLayout