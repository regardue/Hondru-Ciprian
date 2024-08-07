import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const FavoriteFlats = () => {
  const [flats, setFlats] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const flatsCollection = await getDocs(collection(db, "apartments"));
        setFlats(
          flatsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching flats: ", error);
      }
    };

    const fetchFavorites = async () => {
      if (currentUser) {
        const favoritesQuery = query(
          collection(db, "favorites"),
          where("userId", "==", currentUser.uid)
        );
        const favoritesCollection = await getDocs(favoritesQuery);
        setFavorites(
          favoritesCollection.docs.map((doc) => doc.data().flatId)
        );
      }
    };

    fetchFlats();
    fetchFavorites();
  }, [currentUser]);

  return (
    <div>
      <Typography variant="h4">Your Favorite Flats</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flat Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Street Name</TableCell>
            <TableCell>Street Number</TableCell>
            <TableCell>Has AC</TableCell>
            <TableCell>Year Built</TableCell>
            <TableCell>Rent Price</TableCell>
            <TableCell>Date Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flats.filter(flat => favorites.includes(flat.id)).map((flat) => (
            <TableRow key={flat.id}>
              <TableCell>{flat.flatName}</TableCell>
              <TableCell>{flat.city}</TableCell>
              <TableCell>{flat.streetName}</TableCell>
              <TableCell>{flat.streetNumber}</TableCell>
              <TableCell>{flat.hasAC ? "Yes" : "No"}</TableCell>
              <TableCell>{flat.yearBuilt}</TableCell>
              <TableCell>{flat.rentPrice}</TableCell>
              <TableCell>{flat.dateAvailable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FavoriteFlats;
