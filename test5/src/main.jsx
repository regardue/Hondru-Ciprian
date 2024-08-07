import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Home from "./components/home.jsx";
import Header from "./components/header.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import HTTP from "./components/http.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HTTP />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
);
