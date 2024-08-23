// src/App.jsx
import React from "react";
import { useAuth } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NewFlat from "./components/Flats/NewFlat";
import EditFlat from "./components/Flats/EditFlat";
import Profile from "./components/Profile/Profile";
import ProfileUpdate from "./components/Profile/ProfileUpdate";
import AllUsers from "./components/Admin/AllUsers";
import MessageBar from "./components/Messages/MessageBar";
import FlatView from "./components/Flats/FlatView";
import FavoriteFlats from "./components/Flats/FavoriteFlats";
import PrivateRoute from "./components/Routes/PrivateRoute";
import LoadingSpinner from "./components/Loading/LoadingSpinner";
import Header from "../Header";
import ForgotPassword from "./components/Auth/ForgotPassword";
import './components/Css/Global.css';

const App = () => {
  const { isLoading } = useAuth(); // Get the loading state from AuthContext

  if (isLoading) {
    return <LoadingSpinner />; // Show the loading spinner globally if still loading
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Moved here */}
        
        {/* Protected Routes */}
        <Route
          path="/flats/new"
          element={
            <PrivateRoute>
              <NewFlat />
            </PrivateRoute>
          }
        />
        <Route
          path="/flats/:id"
          element={
            <PrivateRoute>
              <FlatView />
            </PrivateRoute>
          }
        />
        <Route
          path="/flats/:id/edit"
          element={
            <PrivateRoute>
              <EditFlat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/update"
          element={
            <PrivateRoute>
              <ProfileUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AllUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <MessageBar />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoriteFlats />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
