import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { DataGrid } from '@mui/x-data-grid';

const FavoriteFlats = () => {
  const [favoriteFlats, setFavoriteFlats] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Step 1: Fetch all the favorite flat IDs for the current user
        const favoritesQuery = query(
          collection(db, "favorites"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(favoritesQuery);

        // Step 2: Fetch the apartment data for each favorite flatId
        const flatsData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const { flatId } = docSnapshot.data();
            const flatDoc = await getDoc(doc(db, "apartments", flatId));
            if (flatDoc.exists()) {
              return { id: flatId, ...flatDoc.data() };
            } else {
              console.error(`No apartment found for flatId: ${flatId}`);
              return null;
            }
          })
        );

        // Step 3: Filter out any null values (in case of missing data)
        setFavoriteFlats(flatsData.filter((flat) => flat !== null));
      } catch (error) {
        console.error("Error fetching favorite flats: ", error);
      }
    };

    fetchFavorites();
  }, [currentUser]);

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
    <div style={{ height: 400, width: '100%' }}>
      <h1>Your Favorite Flats</h1>
      <DataGrid
        rows={favoriteFlats}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default FavoriteFlats;
