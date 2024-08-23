import React, { useState } from 'react'; // Import React and useState hook for managing component state
import { useFormik } from 'formik'; // Import useFormik for form handling and validation
import * as yup from 'yup'; // Import Yup for schema-based validation
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions to interact with the database
import { db, auth } from '../../services/firebase'; // Import Firestore and Authentication instances
import { TextField, Button, Checkbox, FormControlLabel, Grid, Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'; // Import Material-UI components for UI
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { toast } from 'react-toastify'; // Import toast for showing notifications

// Validation schema using Yup to define validation rules for the form
const validationSchema = yup.object({
  flatName: yup.string().required('Flat Name is required'), // Flat Name must be a non-empty string
  city: yup.string().required('City is required'), // City must be a non-empty string
  streetName: yup.string().required('Street Name is required'), // Street Name must be a non-empty string
  streetNumber: yup.string().required('Street Number is required'), // Street Number must be a non-empty string
  yearBuilt: yup.number().integer().required('Year Built is required'), // Year Built must be an integer and is required
  rentPrice: yup.number().positive().required('Rent Price is required'), // Rent Price must be a positive number and is required
  dateAvailable: yup.date().required('Date Available is required'), // Date Available must be a valid date and is required
});

const NewFlat = () => {
  // Hook for navigation
  const navigate = useNavigate();
  // State to manage the open/close status of the confirmation dialog
  const [openDialog, setOpenDialog] = useState(false);

  // Formik hook for managing form state and validation
  const formik = useFormik({
    initialValues: {
      flatName: '', // Initial value for Flat Name field
      city: '', // Initial value for City field
      streetName: '', // Initial value for Street Name field
      streetNumber: '', // Initial value for Street Number field
      hasAC: false, // Initial value for Has AC checkbox
      yearBuilt: '', // Initial value for Year Built field
      rentPrice: '', // Initial value for Rent Price field
      dateAvailable: '', // Initial value for Date Available field
    },
    validationSchema, // Apply the Yup validation schema
    onSubmit: () => {
      // Show confirmation dialog when the form is submitted
      setOpenDialog(true);
    },
  });

  // Handler to close the confirmation dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Handler to confirm and post the apartment data
  const handleConfirmPost = async () => {
    try {
      // Add the new flat document to the Firestore collection
      await addDoc(collection(db, 'apartments'), {
        ...formik.values, // Spread formik values into the new document
        uid: auth.currentUser.uid, // Add user ID to the document
      });
      // Show success notification
      toast.success('Apartment posted successfully!');
      // Close the dialog and navigate to the homepage
      setOpenDialog(false);
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Error adding document: ', error); // Log error to console
      // Show error notification
      toast.error('Failed to post the apartment. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className='custom-container zoom-in'> {/* Container to center and limit form width */}
      <Typography variant="h4" gutterBottom>
        New Flat {/* Page Title */}
      </Typography>
      <form onSubmit={formik.handleSubmit}> {/* Form submission handled by Formik */}
        <Grid container spacing={2}> {/* Grid layout for form fields */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="flatName"
              label="Flat Name"
              value={formik.values.flatName} // Bind field value to Formik
              onChange={formik.handleChange} // Handle field change with Formik
              error={formik.touched.flatName && Boolean(formik.errors.flatName)} // Show error if field has been touched and has an error
              helperText={formik.touched.flatName && formik.errors.flatName} // Show error message
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="streetName"
              label="Street Name"
              value={formik.values.streetName}
              onChange={formik.handleChange}
              error={formik.touched.streetName && Boolean(formik.errors.streetName)}
              helperText={formik.touched.streetName && formik.errors.streetName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="streetNumber"
              label="Street Number"
              value={formik.values.streetNumber}
              onChange={formik.handleChange}
              error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
              helperText={formik.touched.streetNumber && formik.errors.streetNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="hasAC"
                  checked={formik.values.hasAC} // Bind checkbox checked state to Formik
                  onChange={formik.handleChange} // Handle checkbox change with Formik
                />
              }
              label="Has AC"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="yearBuilt"
              label="Year Built"
              type="number" // Input type for number
              value={formik.values.yearBuilt}
              onChange={formik.handleChange}
              error={formik.touched.yearBuilt && Boolean(formik.errors.yearBuilt)}
              helperText={formik.touched.yearBuilt && formik.errors.yearBuilt}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="rentPrice"
              label="Rent Price"
              type="number"
              value={formik.values.rentPrice}
              onChange={formik.handleChange}
              error={formik.touched.rentPrice && Boolean(formik.errors.rentPrice)}
              helperText={formik.touched.rentPrice && formik.errors.rentPrice}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="dateAvailable"
              label="Date Available"
              type="date" // Input type for date
              InputLabelProps={{ shrink: true }} // Ensure the label is always visible
              value={formik.values.dateAvailable}
              onChange={formik.handleChange}
              error={formik.touched.dateAvailable && Boolean(formik.errors.dateAvailable)}
              helperText={formik.touched.dateAvailable && formik.errors.dateAvailable}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Flat {/* Submit button for form */}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Posting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to post this apartment? {/* Confirmation message */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            No {/* Button to close the dialog without posting */}
          </Button>
          <Button
            onClick={handleConfirmPost} // Handle confirmation of posting
            color="primary"
            autoFocus
          >
            Yes {/* Button to confirm and post the apartment */}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Additional Buttons for navigation */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/flats/1/edit')} // Navigate to edit page
            fullWidth
          >
            Edit Flat
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/flats/1')} // Navigate to view flats page
            fullWidth
          >
            View Flats
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewFlat;
