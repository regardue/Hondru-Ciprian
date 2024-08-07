// Importă React și componentele necesare din biblioteci externe
import React from 'react';
// Importă componentele Link și AppBar din react-router-dom și Material-UI
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// Importă hook-ul useAuth pentru a accesa informațiile despre utilizatorul curent
import { useAuth } from '../context/AuthContext';
// Importă funcția signOut și obiectul auth din configurația Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const Header = () => {
  // Obține utilizatorul curent și starea de admin din contextul de autentificare
  const { currentUser, isAdmin } = useAuth();

  // Funcția pentru deconectarea utilizatorului
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Log-uri de debug pentru a verifica valorile curente ale utilizatorului și starea de admin
  console.log("Current User:", currentUser);
  console.log("Is Admin:", isAdmin);

  return (
    // AppBar este bara de navigare fixă din Material-UI
    <AppBar position="static">
      {/* Toolbar este containerul pentru elementele de navigare din AppBar */}
      <Toolbar>
        {/* Typography este folosit pentru titluri și text */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Link-ul către pagina principală, cu stilul de text fără subliniere și culoare moștenită */}
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>FlatFinder</Link>
        </Typography>
        {/* Condiția pentru afișarea elementelor de navigare în funcție de dacă utilizatorul este autentificat */}
        {currentUser ? (
          <>
            {/* Salută utilizatorul și afișează numele sau emailul */}
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Hello, {currentUser.displayName || currentUser.email}
            </Typography>
            {/* Butoane de navigare pentru utilizatorii autentificați */}
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/profile">My Profile</Button>
            {/* Afișează butonul "All Users" doar dacă utilizatorul este admin */}
            {isAdmin && <Button color="inherit" component={Link} to="/admin/users">All Users</Button>}
            {/* {<Button color="inherit" component={Link} to="/messages">Messages</Button> } */}
            {/* Butonul pentru deconectare */}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            {/* Butoane de navigare pentru utilizatorii neautentificați */}
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
