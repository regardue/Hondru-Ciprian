import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, TextField, Button, Typography, Box, Divider } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '../GoogleIcon/GoogleIcon';
import TwitterIcon from '@mui/icons-material/Twitter';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  birthDate: yup.date().required('Birth date is required')
    .test('age', 'You must be at least 18 years old', function (value) {
      return new Date(value) <= new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    }),
});

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
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          birthDate: values.birthDate,
        });

        toast.success('Registration successful!');
        navigate('/');
      } catch (err) {
        const errorMessage = getErrorMessage(err.code);
        toast.error(errorMessage);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in with Google!');
      navigate('/');
    } catch (err) {
      const errorMessage = getErrorMessage(err.code);
      toast.error(errorMessage);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}
    >
      <ToastContainer />
      <Box 
        sx={{ 
          width: '100%', 
          boxShadow: 3, 
          borderRadius: 2, 
          p: 3, 
          backgroundColor: 'background.paper', 
          overflowY: 'auto' 
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: 'primary.main' 
          }}
        >
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
            InputLabelProps={{ shrink: true }}
          />
          <Button 
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit" 
            sx={{ mt: 2, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
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
          sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <GoogleIcon sx={{ mr: 1 }} />
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
          target="_blank"
          sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <TwitterIcon sx={{ mr: 1 }} /> 
          Twitter
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
