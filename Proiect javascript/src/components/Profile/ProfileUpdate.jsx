import React, { useEffect, useState } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { TextField, Button, Typography } from '@mui/material';

const ProfileUpdate = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid); // Adjust path based on your collection structure
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setFormData(data);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc(userDoc, formData);
      alert('Profile updated successfully');
    }
  };

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Update Profile</Typography>
      <form onSubmit={handleSubmit}>
        {Object.keys(userData).map((key) => (
          <TextField
            key={key}
            name={key}
            label={key}
            value={formData[key] || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        ))}
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
