import { createBrowserRouter } from "react-router-dom";
import { LayoutTeachers } from "./app/teachers/_layout";
import { ActivitiesTeacher } from "./app/teachers/ActivitiesTeacher";
import { HistoricTeacher } from "./app/teachers/historicTeacher";
import LoginScreen from "./app/login/Loginscreen";
import { NewActivitiesTeacher } from "./app/teachers/NewActivities";

export const router = createBrowserRouter([
    { path: "/login", element: <LoginScreen /> },
    { path: "/", element: <LoginScreen /> },
    {
        path: "/teachers",
        element: <LayoutTeachers />,
        children: [
            
            {
                path: "activities", // Acessível em /teacher/activities
                element: <ActivitiesTeacher />,
                
            },
            {path: 'new-activitie', element: <NewActivitiesTeacher/>},
            {
                path: "historic",
                element: <HistoricTeacher />,
            },
        ],
    },
]);