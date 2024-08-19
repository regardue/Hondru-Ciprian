import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Validation schema using Yup
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
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [open, setOpen] = useState(false);

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

  // Set formik values when a flat is selected
  useEffect(() => {
    if (selectedFlat) {
      const flat = flats.find(f => f.id === selectedFlat);
      if (flat) {
        formik.setValues(flat);
      }
    }
  }, [selectedFlat, flats]);

  const handleFlatSelect = (flat) => {
    setSelectedFlat(flat.id);
    setOpen(true);
  };

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
      try {
        const flatDoc = doc(db, 'apartments', selectedFlat);
        await updateDoc(flatDoc, values);
        alert('Flat updated successfully');
        setOpen(false);
        await fetchFlats(); // Refresh flats list
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    },
  });

  const handleDelete = async () => {
    if (!selectedFlat) return;
    try {
      await deleteDoc(doc(db, 'apartments', selectedFlat));
      alert('Flat deleted successfully');
      setOpen(false);
      await fetchFlats(); // Refresh flats list
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

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
      <Typography variant="h4" gutterBottom>
        Manage Flats
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={flats} columns={columns} pageSize={5} />
        </div>
      </Paper>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Flat</DialogTitle>
        <DialogContent>
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
                <TextField
                  name="hasAC"
                  label="Has AC"
                  type="checkbox"
                  checked={formik.values.hasAC}
                  onChange={e => formik.setFieldValue('hasAC', e.target.checked)}
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
    </div>
  );
};

export default EditFlat;
