/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom"
import AppLayout from "../views/AppLayout"
import SchoolListView from "../views/schoolList/SchoolListView"
import TrainerListView from "../views/trainerList/TrainerListView"
import SubjectListView from "../views/subjectList/SubjectListView"
import UserListView from "../views/userList/UserListView"
import RoleListView from "../views/roleList/RoleListView"

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
            },
            {
                path: "subjects",
                element: <SubjectListView />
            },
            {
                path: "users",
                element: <UserListView />
            },
            {
                path: "roles",
                element: <RoleListView />
            }
        ]
    }
])