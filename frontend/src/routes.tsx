import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "./app/loginScreen";
import { Layout } from "./app/auth/_layout";
import { Activities } from "./app/auth/Activities";
import { DetailsActivity } from "./app/auth/Activity";
import { NewActivity } from "./app/auth/NewActivity";
import { MyAnwers } from "./app/auth/MyAnswers";
import { AnswersForm } from "./app/auth/AnswersForm";
import { MyAtivities } from "./app/auth/MyAtivities";

export const router = createBrowserRouter([
    { path: "/login", element: <LoginScreen /> },
    { path: "/", element: <LoginScreen /> },
    { 
        path: '/auth', 
        element: <Layout />,
        children: [
            {path: 'activities', element: <Activities />},
            {path: 'new-activity', element: <NewActivity/>},
            {path: 'details-activity', element: <DetailsActivity/>},
            {path: 'my-answers', element: <MyAnwers />},
            {path: 'my-activities', element: <MyAtivities />},
            {path: 'answers', element: <AnswersForm />},
        ]
    },
   
]);