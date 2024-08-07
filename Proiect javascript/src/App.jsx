// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NewFlat from './components/Flats/NewFlat';

import EditFlat from './components/Flats/EditFlat';
import Profile from './components/Profile/Profile';
import ProfileUpdate from './components/Profile/ProfileUpdate';
import AllUsers from './components/Admin/AllUsers';
import Header from './components/header';
import MessageBar from './components/Messages/MessageBar';
import FlatView from './components/Flats/FlatView';
import FavoriteFlats from './components/Flats/FavoriteFlats';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flats/new" element={<NewFlat />} />
        <Route path="/flats/:id" element={<FlatView />} />
        <Route path="/flats/:id/edit" element={<EditFlat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/" element={<FlatView />} />
        <Route path="/messages" element={<MessageBar />} />
        <Route path="/favorites" element={<FavoriteFlats />} />
      </Routes>
    </div>
  );
};

export default App;
