import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext'; // Calea corectată pentru AuthContext

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obține utilizatorul curent

  return (
    <div className='fade-in'>
      {/* Hero Section */}
      <Box className="text-section" sx={{ textAlign: 'center', mb: 4, }}>
        <Typography variant="h1" gutterBottom>
          Welcome to FlatFinder
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your journey to find the perfect flat starts here.
        </Typography>
      </Box>

      {/* Features Section */}
      <Typography variant="h3" gutterBottom align="center">
        Features
      </Typography>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Box className="text-section" sx={{ p: 2, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
            <Typography variant="h5">Track Your Apartment Choices</Typography>
            <Typography variant="body1">
              Focus on tracking your personal potential apartments.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="text-section" sx={{ p: 2, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
            <Typography variant="h5">Manage Your Listings</Typography>
            <Typography variant="body1">
              Update and manage your existing listings to ensure they remain accurate and appealing.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="text-section" sx={{ p: 2, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
            <Typography variant="h5">Discover New Apartments</Typography>
            <Typography variant="body1">
              Browse our extensive collection of flats to find the perfect home for you.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Conditional Buttons for Logged-In Users */}
      {currentUser ? (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button size='large' variant="contained" color="primary" onClick={() => navigate('/flats/new')} sx={{ mr: 8, fontSize:'1.5rem', padding:'1rem 3rem' }}>
            Add New Flat
          </Button>
          <Button size='large' variant="contained" color="primary" onClick={() => navigate('/flats/1/edit')} sx={{ mr: 8, fontSize:'1.5rem', padding:'1rem 3rem' }}>
            Edit Flat
          </Button>
          <Button size='large' variant="contained" color="primary" onClick={() => navigate('/flats/1')} sx={{ fontSize:'1.5rem', padding:'1rem 3rem' }}>
            View Flats
          </Button>
        </Box>
      ) : (
        <Typography variant="h5" gutterBottom color={'white'} align="center">
          Please register or login to access all features.
        </Typography>
      )}

      {/* Testimonials Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" color={'white'} gutterBottom>
          What Our Users Say
        </Typography>
        <Typography variant="body1" color={'white'}>
          "FlatFinder helped me find my perfect home! The process was smooth and easy."
        </Typography>
        <Typography variant="body2" color={'white'} sx={{ fontStyle: 'italic', mt: 1 }}>
          - Satisfied User
        </Typography>
      </Box>

      {/* Footer */}
      <Box color={'white'} sx={{ position: 'fixed', left:0, right:0, bottom:0 ,textAlign: 'center', borderTop: '1px solid #ccc', pt: 3, pb: 3 }}>
        <Typography variant="body2" sx={{ fontSize: '1rem' }}>© 2024 FlatFinder. All rights reserved.</Typography>
      </Box>
    </div>
  );
};

export default Home;