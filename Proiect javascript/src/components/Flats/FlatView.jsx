import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MessageBar from "../Messages/MessageBar";

const FlatView = () => {
  const [flats, setFlats] = useState([]);
  const [favoriteFlats, setFavoriteFlats] = useState(new Set());
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [openMessageBar, setOpenMessageBar] = useState(false);
  const currentUser = auth.currentUser;
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Phones
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Tablets

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const flatsCollection = await getDocs(collection(db, "apartments"));
        setFlats(flatsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
        setFavoriteFlats(new Set(querySnapshot.docs.map((doc) => doc.data().flatId)));
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

  const handleToggleFavorite = async (flat) => {
    try {
      const flatId = flat.id;
      if (favoriteFlats.has(flatId)) {
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
        }
      } else {
        await addDoc(collection(db, "favorites"), {
          flatId: flat.id,
          userId: currentUser.uid,
          flatName: flat.flatName,
          city: flat.city,
          streetName: flat.streetName,
          streetNumber: flat.streetNumber,
          hasAC: flat.hasAC,
          yearBuilt: flat.yearBuilt,
          rentPrice: flat.rentPrice,
          dateAvailable: flat.dateAvailable,
        });
        setFavoriteFlats((prevFavorites) => new Set(prevFavorites).add(flatId));
      }
    } catch (error) {
      console.error("Error toggling favorite status: ", error);
    }
  };

  const columns = [
    { field: 'flatName', headerName: 'Flat Name', flex: 1, minWidth: 150 },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 130 },
    { field: 'streetName', headerName: 'Street Name', flex: 1, minWidth: 130 },
    { field: 'streetNumber', headerName: 'Street Number', flex: 1, minWidth: 130 },
    { field: 'hasAC', headerName: 'Has AC', flex: 0.5, minWidth: 90, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: 'yearBuilt', headerName: 'Year Built', flex: 0.5, minWidth: 110 },
    { field: 'rentPrice', headerName: 'Rent Price', flex: 0.5, minWidth: 110 },
    { field: 'dateAvailable', headerName: 'Date Available', flex: 1, minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          onClick={() => handleSelectFlat(params.row)}
          variant="contained"
          color="secondary"
          size={isMobile ? "small" : "medium"} // Adjust button size on mobile
        >
          {params.row.uid !== currentUser?.uid ? "Send Message" : "View Messages"}
        </Button>
      ),
    },
    {
      field: 'favorite',
      headerName: 'Favorite',
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        params.row.uid !== currentUser?.uid && (
          <Button
            onClick={() => handleToggleFavorite(params.row)}
            variant="text"
            size={isMobile ? "small" : "medium"} // Adjust button size on mobile
          >
            {favoriteFlats.has(params.row.id) ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        )
      ),
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 300 : isTablet ? 500 : 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <h1>All Flats</h1>
      <div style={{ height: isMobile ? 400 : 500, width: '100%', overflowX: 'auto' }}>
        <div style={{ minWidth: '700px' }}> {/* Set minimum width for horizontal scroll */}
          <DataGrid
            rows={flats}
            columns={columns}
            pageSize={isMobile ? 3 : 5}
            rowsPerPageOptions={[3, 5, 10]}
            checkboxSelection
            disableColumnMenu={isMobile} // Simplify UI for mobile users
          />
        </div>
      </div>

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
              receiverUid={selectedFlat.uid}
              currentUserUid={currentUser.uid}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FlatView;
