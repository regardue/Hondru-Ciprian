import React, { useState } from 'react'; // Import React and the useState hook for managing component state
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import function to sign in users with email and password from Firebase Authentication
import { auth } from '../../services/firebase'; // Import the Firebase auth instance configured in your service file
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material'; // Import Material-UI components for UI
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Login = () => {
  // State for managing the email input by the user
  const [email, setEmail] = useState('');
  // State for managing the password input by the user
  const [password, setPassword] = useState('');
  // State for managing error messages
  const [error, setError] = useState('');
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)
    try {
      // Attempt to sign in with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the home page if sign-in is successful
      navigate('/');
    } catch (err) {
      // Set error message if sign-in fails
      setError(err.message);
    }
  };

  // Function to navigate to the forgot password page
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <Container maxWidth="sm" className='custom-container slide-in-left'> {/* Container to center the form with a maximum width of "xs" (extra small) */}
      <Box
        sx={{
          mt: 8, // Margin top for spacing
          display: 'flex',
          flexDirection: 'column', // Arrange children in a column
          alignItems: 'center', // Center children horizontally
          backgroundColor: '#f7f7f7', // Light grey background color
          padding: 4, // Internal padding around the content
          borderRadius: 2, // Rounded corners for the box
          boxShadow: 3, // Shadow effect for visual depth
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}> {/* Form that calls handleSubmit on submission */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address" // Label for the email input field
            type="email" // Input type for email addresses
            value={email} // Current value of the email input
            onChange={(e) => setEmail(e.target.value)} // Update state with the input value
            autoComplete="email" // Provide email suggestions based on the input
            autoFocus // Automatically focus the input field when the page loads
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password" // Label for the password input field
            type="password" // Input type for passwords
            value={password} // Current value of the password input
            onChange={(e) => setPassword(e.target.value)} // Update state with the input value
            autoComplete="current-password" // Provide suggestions for current passwords
          />
          {error && (
            <Typography color="error" variant="body2">
              {error} {/* Display error message if it exists */}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" // Primary color for the button
            sx={{ mt: 3, mb: 2 }} // Margin top and bottom for spacing
          >
            Login
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="#" onClick={handleForgotPassword} variant="body2">
              Forgot password? {/* Link to navigate to the forgot password page */}
            </Link>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"} {/* Link to navigate to the registration page */}
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login; // Export the component for use in other parts of the application
