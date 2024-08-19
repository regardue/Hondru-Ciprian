// src/components/Flats/NewFlat.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { TextField, Button, Checkbox, FormControlLabel, Grid, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = yup.object({
  flatName: yup.string().required('Flat Name is required'),
  city: yup.string().required('City is required'),
  streetName: yup.string().required('Street Name is required'),
  streetNumber: yup.string().required('Street Number is required'),
  yearBuilt: yup.number().integer().required('Year Built is required'),
  rentPrice: yup.number().positive().required('Rent Price is required'),
  dateAvailable: yup.date().required('Date Available is required'),
});

const NewFlat = () => {
  const navigate = useNavigate();

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
    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, 'apartments'), {
          ...values,
          uid: auth.currentUser.uid,
        });
        navigate('/flats');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        New Flat
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="flatName"
              label="Flat Name"
              value={formik.values.flatName}
              onChange={formik.handleChange}
              error={formik.touched.flatName && Boolean(formik.errors.flatName)}
              helperText={formik.touched.flatName && formik.errors.flatName}
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
                  checked={formik.values.hasAC}
                  onChange={formik.handleChange}
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
              type="number"
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
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.dateAvailable}
              onChange={formik.handleChange}
              error={formik.touched.dateAvailable && Boolean(formik.errors.dateAvailable)}
              helperText={formik.touched.dateAvailable && formik.errors.dateAvailable}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Flat
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewFlat;
