import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './src/context/AuthContext';
import { signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, db } from './src/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const Header = () => {
  const { currentUser, isAdmin } = useAuth();
  const [fullName, setFullName] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [password, setPassword] = useState(''); // Add state for password
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const { firstName, lastName } = userData;
            setFullName(`${firstName} ${lastName}`);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleReauthenticateAndDelete = async () => {
    try {
      // Create a credential for re-authentication
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      // Re-authenticate the user
      await reauthenticateWithCredential(currentUser, credential);
      // Proceed with account deletion
      await deleteUser(currentUser);
      toast.success("Your account has been deleted.");
      navigate('/login'); // Redirect to login page after successful deletion
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error("Please sign in again to delete your account.");
      } else {
        console.error("Error deleting account:", error);
        toast.error("Failed to delete account. Please try again.");
      }
    }
  };

  const handleConfirmDelete = () => {
    toast.info('Delete account process initiated.');
    // Call handleReauthenticateAndDelete after a short delay to ensure the toast is shown
    setTimeout(() => {
      handleReauthenticateAndDelete();
    }, 1000); // Adjust the delay as needed
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const activeLinkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    borderBottom: '2px solid #ffeb3b',  // Yellow bar under the active link
    fontWeight: 'bold',
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={linkStyle}>FlatFinder</NavLink>
          </Typography>
          {isSmallScreen ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                {currentUser ? (
                  <>
                    <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/profile')}>My Profile</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/favorites')}>Favorites</MenuItem>
                    {isAdmin && <MenuItem onClick={() => handleMenuItemClick('/admin/users')}>All Users</MenuItem>}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    <MenuItem onClick={handleOpenConfirmation}>Delete Account</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => handleMenuItemClick('/login')}>Login</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/register')}>Register</MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              {currentUser ? (
                <>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    Hello, {fullName || 'User'}
                  </Typography>
                  <NavLink
                    to="/"
                    style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
                  >
                    <Button color="inherit">Home</Button>
                  </NavLink>
                  <NavLink
                    to="/profile"
                    style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
                  >
                    <Button color="inherit">My Profile</Button>
                  </NavLink>
                  <NavLink
                    to="/favorites"
                    style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
                  >
                    <Button color="inherit">Favorites</Button>
                  </NavLink>
                  {isAdmin && (
                    <NavLink
                      to="/admin/users"
                      style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
                    >
                      <Button color="inherit">All Users</Button>
                    </NavLink>
                  )}
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                  <Button color="inherit" onClick={handleOpenConfirmation}>Delete Account</Button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
                  >
                    <Button color="inherit">Login</Button>
                  </NavLink>
                  <NavLink
                    to="/register"
                    style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
                  >
                    <Button color="inherit">Register</Button>
                  </NavLink>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <p>Please re-enter your password to confirm.</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">Cancel</Button>
          <Button
            onClick={() => {
              handleCloseConfirmation(); // Close the dialog first
              handleConfirmDelete(); // Then perform the deletion
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* ToastContainer is required for toast notifications */}
      <ToastContainer />
    </>
  );
};

export default Header;
