import { createBrowserRouter, Navigate } from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import NotFound from "./pages/NotFound";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Signup";
import Users from "./views/Users";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
    children: [

{
        path: "/",
        element: <Navigate to="/users"/>
    },
{
        path: "/users",
        element: <Users/>
    },
{
        path: "/dashboard",
        element: <Dashboard/>
    },
        ]
  },
      {
        path: "/",
        element: <GuestLayout />,
        children: [
           {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Register/>
  },
        ]
    },


    {
        path: "*",
        element: <NotFound/>
    },
]);


export default router;
