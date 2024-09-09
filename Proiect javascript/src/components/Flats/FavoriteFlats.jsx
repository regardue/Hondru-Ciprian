import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { DataGrid } from '@mui/x-data-grid';
import { Container } from "@mui/material";

const FavoriteFlats = () => {
  // State to store favorite flats data
  const [favoriteFlats, setFavoriteFlats] = useState([]);
  // Current authenticated user
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Function to fetch favorite flats for the current user
    const fetchFavorites = async () => {
      try {
        // Step 1: Fetch all the favorite flat IDs for the current user from 'favorites' collection
        const favoritesQuery = query(
          collection(db, "favorites"),
          where("userId", "==", currentUser.uid) // Filter favorites by the current user
        );
        const querySnapshot = await getDocs(favoritesQuery);

        // Step 2: For each favorite flat ID, fetch the corresponding apartment data from 'apartments' collection
        const flatsData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const { flatId } = docSnapshot.data(); // Extract the flatId from the favorite document
            const flatDoc = await getDoc(doc(db, "apartments", flatId)); // Fetch the apartment data using flatId
            if (flatDoc.exists()) {
              return { id: flatId, ...flatDoc.data() }; // Combine the flatId with the flat data
            } else {
              console.error(`No apartment found for flatId: ${flatId}`); // Log an error if the flat data doesn't exist
              return null; // Return null if apartment data is not found
            }
          })
        );

        // Step 3: Filter out any null values (in case some apartments were not found) and update state
        setFavoriteFlats(flatsData.filter((flat) => flat !== null));
      } catch (error) {
        console.error("Error fetching favorite flats: ", error); // Log any errors encountered during fetch
      }
    };

    fetchFavorites(); // Invoke the fetch function on component mount
  }, [currentUser]); // Dependency array includes currentUser to refetch data if it changes

  // Define columns for the DataGrid component
  const columns = [
    { field: 'flatName', headerName: 'Flat Name', width: 150 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'streetName', headerName: 'Street Name', width: 130 },
    { field: 'streetNumber', headerName: 'Street Number', width: 130 },
    { field: 'hasAC', headerName: 'Has AC', width: 90, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: 'yearBuilt', headerName: 'Year Built', width: 110 },
    { field: 'rentPrice', headerName: 'Rent Price', width: 110 },
    { field: 'dateAvailable', headerName: 'Date Available', width: 150 },
  ];

  return (
    <div>
      <Container sx={{ overflow: 'hidden', width: '100%' }} className='custom-container slide-in-right container-more'>
        <h1>Your Favorite Flats</h1>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={favoriteFlats} // Data to display in the grid
              columns={columns} // Column configuration
              pageSize={5} // Number of rows per page
              rowsPerPageOptions={[5, 10]} // Options for number of rows per page
              disableSelectionOnClick // Disable row selection via checkboxes
              sx={{ width: '100%', overflow: 'hidden' }}
            />
          </div>
      </Container>
    </div>
  );
};

export default FavoriteFlats;
