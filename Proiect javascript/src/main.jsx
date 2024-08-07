// Importă React, necesar pentru a folosi JSX și pentru a crea componente
import React from 'react';
// Importă ReactDOM din pachetul 'react-dom/client' pentru a folosi API-ul `createRoot`
import ReactDOM from 'react-dom/client';
// Importă BrowserRouter sub denumirea de `Router` din pachetul `react-router-dom` pentru a gestiona rutele aplicației
import { BrowserRouter as Router } from 'react-router-dom';
// Importă componenta principală a aplicației tale
import App from './App';
// Importă provider-ul de context pentru autentificare
import { AuthProvider } from './context/AuthContext';

// Găsește elementul HTML cu ID-ul 'root' în pagina HTML
const rootElement = document.getElementById('root');

// Verifică dacă elementul 'root' există înainte de a continua
if (rootElement) {
  // Creează un root React pentru a gestiona întreaga aplicație
  const root = ReactDOM.createRoot(rootElement);

  // Rendează aplicația React în root-ul creat
  root.render(
    // StrictMode ajută la identificarea problemelor potențiale în dezvoltare
    <React.StrictMode>
      {/* BrowserRouter (alias Router) permite navigarea între diferite pagini ale aplicației */}
      <Router>
        {/* AuthProvider oferă contextul de autentificare pentru întreaga aplicație */}
        <AuthProvider>
          {/* Aplicația principală a aplicației tale */}
          <App />
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}
