import logo from './logo.svg';
import './App.css';
import UserContext from './components/context';
import { useState } from 'react';
import Navbar from './components/navbar';

function App() {
  const[test,setTest]=useState("Horia")

  return (
    <div className="App">
      <UserContext.Provider value={{test,setTest}}>
        <Navbar></Navbar>
      </UserContext.Provider>
      
    </div>
  );
}

export default App;
