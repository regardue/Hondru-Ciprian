// src/components/Profile/Profile.jsx

import React, { useEffect, useState } from 'react';
import { db, auth } from '../../services/firebase'; // Import Firebase configuration and authentication
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions to interact with the database
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Grid } from '@mui/material'; // Import Material UI components for styling
import { Link } from 'react-router-dom'; // Import Link component for navigation

const Profile = () => {
  const [userData, setUserData] = useState(null); // State to store user data fetched from Firestore
  const currentUser = auth.currentUser; // Get the currently authenticated user from Firebase Authentication

  // useEffect hook to fetch user data when the component mounts or when currentUser changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) { // Check if there is a current user
        try {
          // Get a reference to the user's document in Firestore
          const userDoc = doc(db, 'users', currentUser.uid); // 'users' is the collection and currentUser.uid is the document ID
          const docSnap = await getDoc(userDoc); // Fetch the document snapshot
          if (docSnap.exists()) {
            // If the document exists, update the state with the user data
            setUserData(docSnap.data());
          } else {
            console.log('No such document!'); // Log if the document does not exist
          }
        } catch (error) {
          console.error('Error fetching user data:', error); // Log any errors that occur during data fetching
        }
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [currentUser]); // Dependency array ensures effect runs when currentUser changes

  // Show a loading message while userData is being fetched
  if (!userData) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  // Filter out the 'uid' field from userData for display purposes
  const filteredUserData = Object.entries(userData).filter(([key]) => key !== 'uid');

  return (
    <Container maxWidth="sm" className='custom-container slide-in-left'>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over filteredUserData to display each field and its value */}
            {filteredUserData.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value || 'N/A'}</TableCell> {/* Display 'N/A' if value is empty */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Button to navigate to the profile update page */}
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button component={Link} to="/profile/update" variant="contained" color="primary">
          Edit Profile
        </Button>
      </Grid>
    </Container>
  );
};

export default Profile;
