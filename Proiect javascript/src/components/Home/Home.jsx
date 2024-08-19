import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext'; // Calea corectată pentru AuthContext

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obține utilizatorul curent

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Welcome to FlatFinder
      </Typography>

      {/* Verifică dacă utilizatorul este logat */}
      {currentUser ? (
        <div>
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
      ) : (
        <Typography variant="body1" gutterBottom>
          Please register or login to access all features.
        </Typography>
      )}
    </div>
  );
};

export default Home;
