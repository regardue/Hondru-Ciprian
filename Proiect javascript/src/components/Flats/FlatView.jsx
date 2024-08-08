import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, Box } from "@mui/material";
import MessageBar from "../Messages/MessageBar";

const FlatView = () => {
  const [flats, setFlats] = useState([]);
  const [favoriteFlats, setFavoriteFlats] = useState(new Set()); // Store favorite flat IDs
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [openMessageBar, setOpenMessageBar] = useState(false);
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
        const querySnapshot = await getDocs(favoritesQuery);
        setFavoriteFlats(
          new Set(querySnapshot.docs.map((doc) => doc.data().flatId))
        );
      }
    };

    fetchFlats();
    fetchFavorites();
  }, [currentUser]);

  const handleSelectFlat = (flat) => {
    setSelectedFlat(flat);
    setOpenMessageBar(true);
  };

  const handleCloseMessageBar = () => {
    setOpenMessageBar(false);
    setSelectedFlat(null);
  };

  const handleToggleFavorite = async (flatId) => {
    try {
      if (favoriteFlats.has(flatId)) {
        // If the flat is already in favorites, remove it
        const favoriteDocQuery = query(
          collection(db, "favorites"),
          where("userId", "==", currentUser.uid),
          where("flatId", "==", flatId)
        );
        const favoriteDocSnapshot = await getDocs(favoriteDocQuery);
        if (!favoriteDocSnapshot.empty) {
          await deleteDoc(doc(db, "favorites", favoriteDocSnapshot.docs[0].id));
          setFavoriteFlats((prevFavorites) => {
            const newFavorites = new Set(prevFavorites);
            newFavorites.delete(flatId);
            return newFavorites;
          });
          console.log(`Flat ${flatId} removed from favorites`);
        }
      } else {
        // If the flat is not in favorites, add it
        await addDoc(collection(db, "favorites"), {
          flatId: flatId,
          userId: currentUser.uid,
        });
        setFavoriteFlats((prevFavorites) => new Set(prevFavorites).add(flatId));
        console.log(`Flat ${flatId} added to favorites`);
      }
    } catch (error) {
      console.error("Error toggling favorite status: ", error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <h1>All Flats</h1>
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
            <TableCell>Actions</TableCell>
            <TableCell>Favorite</TableCell> {/* Updated column header */}
          </TableRow>
        </TableHead>
        <TableBody>
          {flats.map((flat) => (
            <TableRow key={flat.id}>
              <TableCell>{flat.flatName}</TableCell>
              <TableCell>{flat.city}</TableCell>
              <TableCell>{flat.streetName}</TableCell>
              <TableCell>{flat.streetNumber}</TableCell>
              <TableCell>{flat.hasAC ? "Yes" : "No"}</TableCell>
              <TableCell>{flat.yearBuilt}</TableCell>
              <TableCell>{flat.rentPrice}</TableCell>
              <TableCell>{flat.dateAvailable}</TableCell>
              <TableCell>
                {flat.uid !== currentUser?.uid ? (
                  <Button
                    onClick={() => handleSelectFlat(flat)}
                    variant="contained"
                    color="secondary"
                  >
                    Send Message
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSelectFlat(flat)}
                    variant="contained"
                    color="primary"
                  >
                    View Messages
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {flat.uid !== currentUser?.uid && (
                  <Button
                    onClick={() => handleToggleFavorite(flat.id)}
                    variant="text"
                  >
                    {favoriteFlats.has(flat.id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={openMessageBar}
        onClose={handleCloseMessageBar}
        aria-labelledby="send-message-modal"
        aria-describedby="send-message-to-flat-owner"
      >
        <Box sx={style}>
          {selectedFlat && (
            <MessageBar
              flatId={selectedFlat.id}
              receiverUid={selectedFlat.uid} // Assuming each flat has an owner UID
              currentUserUid={currentUser.uid} // Pass the current user UID
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FlatView;
