import React,{useEffect} from 'react'
import { useAuth } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import Header from './header'

function Home() {

  const navigate = useNavigate();
  const {currentUser, userLoggedIn} =useAuth();
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  },[currentUser]);

  return (
    <div>
      <Header></Header>
      <div>Hello {currentUser?
      currentUser.email:
      "y"}</div>
    </div>
  )
}

export default Home
