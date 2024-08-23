// src/components/Profile/ProfileUpdate.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { TextField, Button, Typography, Container, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

// Validation schema using Yup
const validationSchema = yup.object({
  // Add validation rules here if needed
  // Example:
  // name: yup.string().required('Name is required'),
});

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for confirmation dialog
  const navigate = useNavigate(); // Use navigate hook for redirection
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = doc(db, 'users', currentUser.uid); // Adjust path based on your collection structure
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setFormData(data);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      setConfirmationOpen(true); // Open the confirmation dialog
    },
  });

  const handleConfirmUpdate = async () => {
    setConfirmationOpen(false); // Close confirmation dialog
    if (currentUser) {
      const userDoc = doc(db, 'users', currentUser.uid);
      try {
        await updateDoc(userDoc, formik.values);
        toast.success('Profile updated successfully'); // Show success toast
        navigate('/profile'); // Navigate to profile page
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile'); // Show error toast
      }
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  if (!userData) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  // Exclude 'uid' from form fields
  const filteredUserData = Object.keys(userData).filter((key) => key !== 'uid');

  return (
    <Container maxWidth="sm" className='custom-container slide-in-right'>
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {filteredUserData.map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  name={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formik.values[key] || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[key] && Boolean(formik.errors[key])}
                  helperText={formik.touched[key] && formik.errors[key]}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save these changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmUpdate} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileUpdate;
