// src/components/Flats/NewFlat.jsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewFlat = () => {
  const [flatData, setFlatData] = useState({
    flatName: '',
    city: '',
    streetName: '',
    streetNumber: '',
    hasAC: false,
    yearBuilt: '',
    rentPrice: '',
    dateAvailable: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFlatData({
      ...flatData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'apartments'), {
        ...flatData,
        uid: auth.currentUser.uid,
      });
      navigate('/flats');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h1>New Flat</h1>
      <form onSubmit={handleSubmit}>
        <TextField name="flatName" label="Flat Name" onChange={handleChange} fullWidth />
        <TextField name="city" label="City" onChange={handleChange} fullWidth />
        <TextField name="streetName" label="Street Name" onChange={handleChange} fullWidth />
        <TextField name="streetNumber" label="Street Number" onChange={handleChange} fullWidth />
        <FormControlLabel
          control={<Checkbox name="hasAC" checked={flatData.hasAC} onChange={handleChange} />}
          label="Has AC"
        />
        <TextField name="yearBuilt" label="Year Built" onChange={handleChange} fullWidth />
        <TextField name="rentPrice" label="Rent Price" onChange={handleChange} fullWidth />
        <TextField name="dateAvailable" label="Date Available" onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary">
          Add Flat
        </Button>
      </form>
    </div>
  );
};

export default NewFlat;
