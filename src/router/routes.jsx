/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom"
import AppLayout from "../views/AppLayout"
import SchoolListView from "../views/schoolList/SchoolListView"
import TrainerListView from "../views/trainerList/TrainerListView"

export default createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "schools",
                element: <SchoolListView />
            },
            {
                path: "trainers",
                element: <TrainerListView />
            }
        ]
    }
])