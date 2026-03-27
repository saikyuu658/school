import { createBrowserRouter } from "react-router-dom";
import { LayoutTeachers } from "./app/teachers/_layout";
import { DashboardTeacher } from "./app/teachers/Dashboardteacher";
import { ActivitiesTeacher } from "./app/teachers/ActivitiesTeacher";
import { HistoricTeacher } from "./app/teachers/historicTeacher";
import LoginScreen from "./app/login/Loginscreen";

export const router = createBrowserRouter([
    { path: "/login", element: <LoginScreen /> },
    { path: "/", element: <LoginScreen /> },
    {
        path: "/teachers",
        element: <LayoutTeachers />,
        children: [
            {
                path: "dashboard", // Acessível em /teacher/dashboard
                element: <DashboardTeacher />,
            },
            {
                path: "activities", // Acessível em /teacher/activities
                element: <ActivitiesTeacher />,
            },
            {
                path: "historic",
                element: <HistoricTeacher />,
            },
        ],
    },
]);