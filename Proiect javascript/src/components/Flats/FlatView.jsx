import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox, Modal, Box, useMediaQuery, Container, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { FavoriteBorder, Favorite, BookmarkBorder, Bookmark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import MessageBar from "../Messages/MessageBar"; // Component to handle messaging
import { Button } from '@mui/material';


const FlatView = () => {
  // State to store flats and user's favorite flats
  const [flats, setFlats] = useState([]);
  const [favoriteFlats, setFavoriteFlats] = useState(new Set());
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [openMessageBar, setOpenMessageBar] = useState(false);

  // Get the currently authenticated user
  const currentUser = auth.currentUser;

  // Hooks for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // For mobile screens
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // For tablet screens

  // Hook for navigation
  const navigate = useNavigate();

  // Fetch flats and favorite flats on component mount
  useEffect(() => {
    // Function to fetch all flats
    const fetchFlats = async () => {
      try {
        const flatsCollection = await getDocs(collection(db, "apartments"));
        setFlats(flatsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching flats: ", error);
      }
    };

    // Function to fetch favorite flats for the current user
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

  // Handle selecting a flat to message or view messages
  const handleSelectFlat = (flat) => {
    setSelectedFlat(flat);
    setOpenMessageBar(true);
  };

  // Close the message modal
  const handleCloseMessageBar = () => {
    setOpenMessageBar(false);
    setSelectedFlat(null);
  };

  // Toggle favorite status for a flat
  const handleToggleFavorite = async (flat) => {
    try {
      const flatId = flat.id;
      if (favoriteFlats.has(flatId)) {
        // If already a favorite, remove it
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
        // If not a favorite, add it
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

  // Define columns for DataGrid
  const columns = [
    { field: 'flatName', headerName: 'Flat Name', flex: 1, minWidth: 150, sortable: true,filterable: true },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 130, sortable: true, filterable: true },
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
        <Checkbox
          icon={<BookmarkBorder />}
          checkedIcon={<Bookmark />}
          checked={selectedFlat?.id === params.row.id}
          onClick={() => handleSelectFlat(params.row)}
        />
      ),
    },
    {
      field: 'favorite',
      headerName: 'Favorite',
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        params.row.uid !== currentUser?.uid && (
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={favoriteFlats.has(params.row.id)}
            onClick={() => handleToggleFavorite(params.row)}
          />
        )
      ),
    },
  ];

  // Styling for the modal
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
      {/* Navigation Buttons */}
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Button
          className='zoom-in'
          variant="contained"
          color="primary"
          onClick={() => navigate('/flats/new')}
          style={{ marginRight: '10px' }}
        >
          Add New Flat
        </Button>
        <Button
          className='zoom-in'
          variant="contained"
          color="primary"
          onClick={() => navigate('/flats/1/edit')}
        >
          Edit Flat
        </Button>
      </div>

      <Container sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, p: 3, width:'100vw', maxWidth: '100vw', minWidth: '100vw', overflowX: 'auto' }} className='fade-in'>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        All Flats
      </Typography>
      <div style={{ height: isMobile ? 400 : 500, width: '100%', overflowX: 'auto' }}>
        <div style={{ minWidth: '700px' }}> {/* Ensure minimum width for horizontal scroll */}
          <DataGrid
            rows={flats}
            columns={columns}
            pageSize={isMobile ? 3 : 5}
            rowsPerPageOptions={[3, 5, 10]}
            disableRowSelectionOnClick
            disableColumnMenu={isMobile} // Disable column menu on mobile
            sortingMode="client"
            filterMode="client"
          />
        </div>
      </div>
      </Container>

      {/* Modal for messaging */}
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
