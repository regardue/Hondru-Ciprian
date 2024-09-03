import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Typography, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Validation schema using Yup for form validation
const validationSchema = yup.object({
  flatName: yup.string().required('Flat name is required'),
  city: yup.string().required('City is required'),
  streetName: yup.string().required('Street name is required'),
  streetNumber: yup.string().required('Street number is required'),
  yearBuilt: yup.number().required('Year built is required').positive('Year must be positive').integer('Year must be an integer'),
  rentPrice: yup.number().required('Rent price is required').positive('Price must be positive'),
  dateAvailable: yup.date().required('Date available is required'),
  hasAC: yup.boolean(),
});

const EditFlat = () => {
  // State to store list of flats and selected flat
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for confirmation dialog
  const navigate = useNavigate(); // Hook for navigation

  // Fetch flats from Firestore when the component mounts
  useEffect(() => {
    const fetchFlats = async () => {
      if (auth.currentUser) {
        try {
          const q = query(collection(db, 'apartments'), where('uid', '==', auth.currentUser.uid));
          const flatsCollection = await getDocs(q);
          const flatsList = flatsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFlats(flatsList);
        } catch (error) {
          console.error('Error fetching flats: ', error);
        }
      } else {
        console.error('No current user found.');
      }
    };
    fetchFlats();
  }, []);

  // Update formik values when selectedFlat changes
  useEffect(() => {
    if (selectedFlat) {
      const flat = flats.find(f => f.id === selectedFlat);
      if (flat) {
        formik.setValues(flat);
      }
    }
  }, [selectedFlat, flats]);

  // Handler for selecting a flat and opening the edit dialog
  const handleFlatSelect = (flat) => {
    setSelectedFlat(flat.id);
    setOpen(true);
  };

  // Formik setup for managing form state and validation
  const formik = useFormik({
    initialValues: {
      flatName: '',
      city: '',
      streetName: '',
      streetNumber: '',
      hasAC: false,
      yearBuilt: '',
      rentPrice: '',
      dateAvailable: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setConfirmationOpen(true); // Open the confirmation dialog on form submit
    },
  });

  // Handle update confirmation and perform the update operation
  const handleConfirmUpdate = async () => {
    setConfirmationOpen(false); // Close confirmation dialog
    try {
      const flatDoc = doc(db, 'apartments', selectedFlat);
      await updateDoc(flatDoc, formik.values);
      toast.success('Flat updated successfully'); // Notify user of success
      navigate('/'); // Navigate to home page
      await fetchFlats(); // Refresh flats list
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  // Handle flat deletion
  const handleDelete = async () => {
    if (!selectedFlat) return;
    try {
      await deleteDoc(doc(db, 'apartments', selectedFlat));
      toast.success('Flat deleted successfully'); // Notify user of success
      setOpen(false);
      navigate('/'); // Navigate to home page after deletion
    } catch (error) {
      console.error('Error deleting document: ', error);
      toast.error('Error deleting flat'); // Notify user of error
    }
  };

  // Close the dialog and reset the form
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'flatName', headerName: 'Flat Name', width: 150 },
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'streetName', headerName: 'Street Name', width: 150 },
    { field: 'streetNumber', headerName: 'Street Number', width: 130 },
    { field: 'yearBuilt', headerName: 'Year Built', width: 120 },
    { field: 'rentPrice', headerName: 'Rent Price', width: 120 },
    { field: 'dateAvailable', headerName: 'Date Available', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleFlatSelect(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>     
      <Grid container spacing={2} style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate('/flats/new')} className='zoom-in'>
            Add New Flat
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate('/flats/1')} className='zoom-in'>
            View Flats
          </Button>
        </Grid>
      </Grid>
      
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }} className='fade-in'>
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          Manage Flats
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={flats} columns={columns} pageSize={5} />
        </div>
      </Paper>

      {/* Dialog for editing a flat */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Flat</DialogTitle>
        <DialogContent maxWidth="sm" className='custom-container'>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="flatName"
                  label="Flat Name"
                  fullWidth
                  value={formik.values.flatName}
                  onChange={formik.handleChange}
                  error={formik.touched.flatName && Boolean(formik.errors.flatName)}
                  helperText={formik.touched.flatName && formik.errors.flatName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  label="City"
                  fullWidth
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="streetName"
                  label="Street Name"
                  fullWidth
                  value={formik.values.streetName}
                  onChange={formik.handleChange}
                  error={formik.touched.streetName && Boolean(formik.errors.streetName)}
                  helperText={formik.touched.streetName && formik.errors.streetName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="streetNumber"
                  label="Street Number"
                  fullWidth
                  value={formik.values.streetNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
                  helperText={formik.touched.streetNumber && formik.errors.streetNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="yearBuilt"
                  label="Year Built"
                  type="number"
                  fullWidth
                  value={formik.values.yearBuilt}
                  onChange={formik.handleChange}
                  error={formik.touched.yearBuilt && Boolean(formik.errors.yearBuilt)}
                  helperText={formik.touched.yearBuilt && formik.errors.yearBuilt}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="rentPrice"
                  label="Rent Price"
                  type="number"
                  fullWidth
                  value={formik.values.rentPrice}
                  onChange={formik.handleChange}
                  error={formik.touched.rentPrice && Boolean(formik.errors.rentPrice)}
                  helperText={formik.touched.rentPrice && formik.errors.rentPrice}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dateAvailable"
                  label="Date Available"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formik.values.dateAvailable}
                  onChange={formik.handleChange}
                  error={formik.touched.dateAvailable && Boolean(formik.errors.dateAvailable)}
                  helperText={formik.touched.dateAvailable && formik.errors.dateAvailable}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                control={
                  <Checkbox
                  name='hasAC'
                  checked={formik.values.hasAC}
                  onChange={e => formik.setFieldValue('hasAC', e.target.checked)}
                  />
                }
                label="Has AC"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={formik.handleSubmit} variant="contained" color="primary">
            Update Flat
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete Flat
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for updates */}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to update this flat?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmUpdate} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditFlat;
