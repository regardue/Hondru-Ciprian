import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, Box } from "@mui/material";
import MessageBar from "../Messages/MessageBar";

const FlatView = () => {
  const [flats, setFlats] = useState([]);
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
    fetchFlats();
  }, []);

  const handleSelectFlat = (flat) => {
    setSelectedFlat(flat);
    setOpenMessageBar(true);
  };

  const handleCloseMessageBar = () => {
    setOpenMessageBar(false);
    setSelectedFlat(null);
  };

  const handleAddToFavorites = (flatId) => {
    // Add logic to handle adding to favorites
    console.log(`Add flat ${flatId} to favorites`);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
            
            <TableCell>Add to Favorites</TableCell> {/* New column header */}
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
                <Button
                  onClick={() => handleAddToFavorites(flat.id)}
                  variant="text" // Using a simple button without specific Material-UI design
                >
                  Add to Favorites
                </Button>
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
