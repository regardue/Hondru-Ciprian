import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './pages/home.jsx'
import Profile from './pages/profiles.jsx'
import Profiles from './pages/profile.jsx'
import NotFound from './pages/notFound.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<NotFound></NotFound>
  },
  {
    path:'/profile',
    element:<Profile/>,
    children:[{
      path:':userId',
      element:<Profiles/>
    }]
  },
  // {
  //   path:'/myProfile/:userId',
  //   element:<Profiles/>
  // }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
