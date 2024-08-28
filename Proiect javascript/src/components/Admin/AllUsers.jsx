// src/components/Users/AllUsers.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Container, Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast for notifications

// Validation schema using Yup to validate form inputs
const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  birthdate: yup.date().required('Date of birth is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AllUsers = () => {
  // State to hold user data from Firestore
  const [users, setUsers] = useState([]);
  // State to manage the user currently being edited
  const [editingUser, setEditingUser] = useState(null);
  // State to control the visibility of the confirmation dialog
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch users from Firestore
    const fetchUsers = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'users'));
        // Map the documents to user objects and set them in state
        setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array means this runs once on component mount

  // Handler for edit button click
  const handleEditClick = (user) => {
    if (!user.isAdmin) {
      setEditingUser(user); // Set the user to be edited
    }
  };

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: editingUser || {
      email: '',
      firstName: '',
      lastName: '',
      birthdate: '',
      password: '',
    },
    validationSchema,
    enableReinitialize: true, // Reinitialize form if editingUser changes
    onSubmit: () => {
      setConfirmationOpen(true); // Open confirmation dialog on form submit
    },
  });

  // Confirm update of user data
  const handleConfirmUpdate = async () => {
    setConfirmationOpen(false); // Close confirmation dialog
    if (editingUser) {
      const userDoc = doc(db, 'users', editingUser.id);
      try {
        // Update user document in Firestore
        await updateDoc(userDoc, formik.values);
        // Update user list in state
        setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...formik.values } : user)));
        setEditingUser(null); // Clear editingUser state
        navigate('/admin/users'); // Redirect to users list
        toast.success('User data has been saved successfully'); // Success notification
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Failed to save user data'); // Error notification
      }
    }
  };

  // Close confirmation dialog without saving
  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  // Close edit dialog and reset form
  const handleClose = () => {
    setEditingUser(null);
    formik.resetForm();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        All Users
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
                <TableCell>******</TableCell> {/* Hide password for security reasons */}
                <TableCell>
                  {user.isAdmin ? (
                    <Button disabled>Edit</Button>
                  ) : (
                    <Button onClick={() => handleEditClick(user)}>Edit</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog for editing user */}
      <Dialog open={!!editingUser} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="dense"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              margin="dense"
              name="birthdate"
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
              helperText={formik.touched.birthdate && formik.errors.birthdate}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for saving changes */}
      <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save these changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmUpdate} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllUsers;
