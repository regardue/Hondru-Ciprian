// src/components/Home/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to FlatFinder</h1>
      <Button variant="contained" color="primary" onClick={() => navigate('/flats/new')}>
        Add New Flat
      </Button>
      <Button variant="contained" color="primary" onClick={() => navigate('/flats/1/edit')}>
        Edit Flat
      </Button>
      <Button variant="contained" color="primary" onClick={() => navigate('/flats/1')}>
        View Flats
      </Button>
    </div>
  );
};

export default Home;
