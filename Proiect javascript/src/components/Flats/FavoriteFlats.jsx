import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const FavoriteFlats = () => {
  const [favorites, setFavorites] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesQuery = query(
          collection(db, "favorites"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(favoritesQuery);
        setFavorites(
          querySnapshot.docs.map((doc) => doc.data().flatId)
        );
      } catch (error) {
        console.error("Error fetching favorite flats: ", error);
      }
    };
    fetchFavorites();
  }, [currentUser]);

  return (
    <div>
      <h1>Your Favorite Flats</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flat ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.map((flatId) => (
            <TableRow key={flatId}>
              <TableCell>{flatId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FavoriteFlats;
