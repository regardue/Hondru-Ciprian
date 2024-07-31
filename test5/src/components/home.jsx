import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Home() {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const userCollection = collection(db, "users");
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  const checkAdminStatus = async () => {
    if(currentUser){
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if(userDoc.exists()){
            setIsAdmin(userDoc.data().admin || false);
            fetchUsers();
        }
    }
  };

  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    fetchUsers();
  }

  useEffect( () => {
    if (!currentUser) {
        
      navigate("/login");
    } else {
        checkAdminStatus ()
    }
  }, [isAdmin] );


  return (
    <div>
      <Header />
      <Typography variant="h4" gutterBottom>
        Registered Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Birthday</TableCell>
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.birthday}</TableCell>
                {isAdmin &&(
                    <TableCell>
                        <Button 
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete(user.id)}
                        >Delete</Button>
                    </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
