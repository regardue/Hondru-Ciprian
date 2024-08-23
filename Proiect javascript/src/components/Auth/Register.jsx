import React from 'react'; // Import React to create the component
import { useFormik } from 'formik'; // Import useFormik hook for form management
import * as yup from 'yup'; // Import yup for schema validation
import { Container, TextField, Button, Typography, Box } from '@mui/material'; // Import Material-UI components for UI
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import Firebase authentication functions
import { auth, db } from '../../services/firebase'; // Import Firebase auth and Firestore database instances
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions to interact with the database
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation
import { toast, ToastContainer } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS for styling
import GoogleIcon from '../GoogleIcon/GoogleIcon'; // Import the google icon
import { Divider } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';

// Validation schema for Formik using yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email') // Validate email format
    .required('Email is required'), // Ensure email is provided
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length') // Ensure password is at least 6 characters long
    .required('Password is required'), // Ensure password is provided
  firstName: yup
    .string()
    .required('First name is required'), // Ensure first name is provided
  lastName: yup
    .string()
    .required('Last name is required'), // Ensure last name is provided
  birthDate: yup
    .date()
    .required('Birth date is required') // Ensure birth date is provided
    .test(
      'age',
      'You must be at least 18 years old',
      function (value) {
        // Ensure user is at least 18 years old
        return new Date(value) <= new Date(new Date().setFullYear(new Date().getFullYear() - 18));
      }
    ),
});

// Function to get error messages based on Firebase error codes
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already in use. Please try another one.';
    case 'auth/invalid-email':
      return 'The email address is not valid. Please enter a valid email.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'The password is too weak. Please enter a stronger password.';
    case 'auth/popup-closed-by-user':
      return 'The popup was closed before completing the sign-in. Please try again.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials. Please try a different sign-in method.';
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
};

const Register = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically

  // Formik setup for managing form state and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: '',
    },
    validationSchema: validationSchema, // Set validation schema
    onSubmit: async (values) => {
      try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          birthDate: values.birthDate,
        });

        // Show success message and navigate to home page
        toast.success('Registration successful!');
        navigate('/');
      } catch (err) {
        // Show error message if registration fails
        const errorMessage = getErrorMessage(err.code);
        toast.error(errorMessage);
      }
    },
  });

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Create a Google Auth provider
    try {
      await signInWithPopup(auth, provider); // Sign in with Google popup
      toast.success('Logged in with Google!'); // Show success message
      navigate('/'); // Navigate to home page
    } catch (err) {
      // Show error message if Google sign-in fails
      const errorMessage = getErrorMessage(err.code);
      toast.error(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm" className='custom-container slide-in-right'> {/* Container with max width "sm" for medium screens */}
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <Box sx={{ mt: 5, p: 3, boxShadow:3, borderRadius: 2, backgroundColor: 'background.paper'}}> {/* Box component with top margin */}
        <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight:'bold', textAlign:'center', color:'primary,main'}}>
          Register {/* Heading for the registration form */}
        </Typography>
        <form onSubmit={formik.handleSubmit}> {/* Form with Formik's handleSubmit */}
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            margin="normal"
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            margin="normal"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <TextField
            fullWidth
            id="birthDate"
            name="birthDate"
            label="Birth Date"
            type="date"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            helperText={formik.touched.birthDate && formik.errors.birthDate}
            margin="normal"
            InputLabelProps={{ shrink: true }} // Ensure the label is always visible for date input
          />
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2, backgroundColor:'primary.main', '&:hover': {backgroundColor: 'primary.dark'} }}>
            Register 
          </Button>
        </form>
        <Divider sx={{ my: 2 }} />
        <Typography variant='body2' align='center' color="text.secondary">
          Or sign in with:
        </Typography>
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          onClick={handleGoogleSignIn}
          sx={{ mt: 2, display:'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <GoogleIcon sx={{mr:1}} />
          Sign in with Google 
        </Button>
        <Divider sx={{ my: 2 }} />
        <Typography variant='body2' align='center' color="text.secondary">
          You can also find us on Twitter
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          href="https://twitter.com/Finder_flat" 
          target="_blank" // Open link in a new tab
          sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <TwitterIcon sx={{ mr: 1 }} /> 
          Twitter
        </Button>
      </Box>
    </Container>
  );
};

export default Register; // Export the Register component for use in other parts of the application
