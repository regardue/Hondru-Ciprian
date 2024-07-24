import React from 'react'
import { useAuth } from '../contexts/authContext'
import { Link,useNavigate } from 'react-router-dom';
import { doSignOut } from '../auth';
import { Button } from '@mui/material';

function Header() {

  const navigate = useNavigate();
  const {currentUser,userLoggedIn} = useAuth();

  return (
      <nav>
        {
          userLoggedIn?
          <>
          <Button variant="contained" onClick={()=>{doSignOut().then(()=>{navigate('/login')})}} >Logout</Button>
          <p>Hello user:{currentUser.email}</p>
          </>
          :
          <>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
          </>
        }
      </nav>
  )
}

export default Header
