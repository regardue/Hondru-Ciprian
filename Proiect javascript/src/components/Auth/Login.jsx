// Importă React și useState pentru a gestiona starea componentelor
import React, { useState } from 'react';
// Importă contextul de autentificare
import { useAuth } from '../../context/AuthContext';
// Importă funcția pentru autentificare cu email și parolă din Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
// Importă obiectul de autentificare Firebase
import { auth } from '../../services/firebase';
// Importă componentele de UI din Material-UI
import { TextField, Button, Container } from '@mui/material';
// Importă useNavigate pentru a naviga între pagini
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Declara variabilele de stare pentru email, parolă și eventualele erori
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Obține funcția de navigare din React Router
  const navigate = useNavigate();

  // Funcția care se ocupă cu trimiterea formularului de autentificare
  const handleSubmit = async (e) => {
    // Previne comportamentul implicit al formularului (care ar fi să se reîncarce pagina)
    e.preventDefault();
    try {
      // Încearcă să autentifice utilizatorul cu emailul și parola furnizate
      await signInWithEmailAndPassword(auth, email, password);
      // Dacă autentificarea reușește, navighează către pagina principală
      navigate('/');
    } catch (err) {
      // Dacă apare o eroare, setează mesajul de eroare
      setError(err.message);
    }
  };

  return (
    // Containerul din Material-UI pentru a centra și a organiza formularul
    <Container>
      {/* Formularul pentru autentificare */}
      <form onSubmit={handleSubmit}>
        {/* Câmp pentru email */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        {/* Câmp pentru parolă */}
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        {/* Butonul pentru trimiterea formularului */}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        {/* Afișează mesajul de eroare dacă există */}
        {error && <p>{error}</p>}
      </form>
    </Container>
  );
};

export default Login;
