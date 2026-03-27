import { createBrowserRouter } from "react-router-dom";
import { LayoutTeachers } from "./app/teachers/_layout";
import { ActivitiesTeacher } from "./app/teachers/ActivitiesTeacher";
import { HistoricTeacher } from "./app/teachers/HistoricTeacher";
import LoginScreen from "./app/login/Loginscreen";
import { CreateActivityForm, } from "./app/teachers/NewActivities";
import { DetailsActivitiesTeacher } from "./app/teachers/DetailsActivities";
import { MyAnwers } from "./app/students/MyAnswers";
import { MyAtivities} from "./app/students/MyAtivities";
import { LayoutStudent } from "./app/students/_layout";
import { AnswersForm } from "./app/students/AnswersForm";

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
            {
                path: "historic",
                element: <HistoricTeacher />,
            },
            {path: 'new-activitie', element: <CreateActivityForm/>},
            {path: 'details-activitie', element: <DetailsActivitiesTeacher/>},
        ],
    },
     {
        path: "/student",
        element: <LayoutStudent />,
        children: [
            
            {
                path: "activities", // Acessível em /teacher/activities
                element: <MyAtivities />,
                
            },
            {
                path: "historic",
                element: <MyAnwers />,
            },
            {
                path: "answers",
                element: <AnswersForm />,
            },
        ],
    },
]);