import React, { useState } from 'react'; // Import React and the useState hook for managing component state
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the function to send a password reset email from Firebase Authentication
import { auth } from '../../services/firebase'; // Import the Firebase auth instance configured in your service file
import { TextField, Button, Container, Typography, Box } from '@mui/material'; // Import Material-UI components for building the UI

const ForgotPassword = () => {
  // State for managing the email input by the user
  const [email, setEmail] = useState('');
  // State for managing feedback messages (success or error)
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form behavior (page reload)
    try {
      // Send a password reset email using Firebase Authentication
      await sendPasswordResetEmail(auth, email);
      // Set success message if email is sent successfully
      setMessage('Password reset email sent!');
    } catch (error) {
      // Set error message if there's a problem sending the email
      setMessage(error.message);
    }
  };

  return (
    <Container maxWidth="sm" className='custom-container slide-in-left'> {/* Container to center the form with a max width of "xs" (extra small) */}
      <Box
        sx={{
          mt: 8, // Margin top for spacing
          display: 'flex',
          flexDirection: 'column', // Arrange children elements in a column
          alignItems: 'center', // Center children elements horizontally
          backgroundColor: '#f7f7f7', // Light grey background color
          padding: 4, // Internal padding around the content
          borderRadius: 2, // Rounded corners for the box
          boxShadow: 3, // Shadow effect for visual depth
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Forgot Password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" // Primary color for the button
            sx={{ mt: 3, mb: 2 }} // Margin top and bottom for spacing
          >
            Send Password Reset Email
          </Button>
        </form>
        {message && (
          <Typography color="textSecondary" variant="body2">
            {message} {/* Display success or error message */}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword; // Export the component for use in other parts of the application
