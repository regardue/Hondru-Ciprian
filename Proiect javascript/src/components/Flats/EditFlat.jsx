import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebase'; // Make sure to import auth for current user
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EditFlat = () => {
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchFlats = async () => {
      if (auth.currentUser) {
        try {
          // Use `uid` for filtering
          const q = query(
            collection(db, 'apartments'),
            where('uid', '==', auth.currentUser.uid) // Use 'uid' instead of 'ownerUid'
          );
          const flatsCollection = await getDocs(q);
          const flatsList = flatsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log('Fetched flats:', flatsList); // Debugging log
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

  const handleFlatSelect = (flat) => {
    setSelectedFlat(flat.id);
    setFlatData(flat);
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlatData({
      ...flatData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flatDoc = doc(db, 'apartments', selectedFlat);
      await updateDoc(flatDoc, flatData);
      alert('Flat updated successfully');
      setOpen(false);
      // Refresh flats list
      await fetchFlats();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedFlat) return;
    try {
      await deleteDoc(doc(db, 'apartments', selectedFlat));
      alert('Flat deleted successfully');
      setOpen(false);
      // Refresh flats list
      await fetchFlats();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchFlats = async () => {
    if (auth.currentUser) {
      try {
        const q = query(
          collection(db, 'apartments'),
          where('uid', '==', auth.currentUser.uid) // Ensure the filter is correct
        );
        const flatsCollection = await getDocs(q);
        const flatsList = flatsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Refreshed flats:', flatsList); // Debugging log
        setFlats(flatsList);
      } catch (error) {
        console.error('Error fetching flats: ', error);
      }
    } else {
      console.error('No current user found.');
    }
  };

  return (
    <div>
      <h1>Edit Flat</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flat Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Street Name</TableCell>
              <TableCell>Street Number</TableCell>
              <TableCell>Year Built</TableCell>
              <TableCell>Rent Price</TableCell>
              <TableCell>Date Available</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flats.map(flat => (
              <TableRow key={flat.id} onClick={() => handleFlatSelect(flat)} style={{ cursor: 'pointer' }}>
                <TableCell>{flat.flatName}</TableCell>
                <TableCell>{flat.city}</TableCell>
                <TableCell>{flat.streetName}</TableCell>
                <TableCell>{flat.streetNumber}</TableCell>
                <TableCell>{flat.yearBuilt}</TableCell>
                <TableCell>{flat.rentPrice}</TableCell>
                <TableCell>{flat.dateAvailable}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleFlatSelect(flat)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Flat</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField name="flatName" label="Flat Name" value={flatData.flatName} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="city" label="City" value={flatData.city} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="streetName" label="Street Name" value={flatData.streetName} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="streetNumber" label="Street Number" value={flatData.streetNumber} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="hasAC" label="Has AC" type="checkbox" checked={flatData.hasAC} onChange={e => setFlatData({ ...flatData, hasAC: e.target.checked })} fullWidth margin="dense" />
            <TextField name="yearBuilt" label="Year Built" value={flatData.yearBuilt} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="rentPrice" label="Rent Price" value={flatData.rentPrice} onChange={handleChange} fullWidth margin="dense" />
            <TextField name="dateAvailable" label="Date Available" value={flatData.dateAvailable} onChange={handleChange} fullWidth margin="dense" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
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
