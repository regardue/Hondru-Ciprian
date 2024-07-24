import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { doSignInWithEmailAndPassword } from "../auth";
import { useNavigate } from "react-router-dom";
import Header from "./header";

function Login() {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  async function handleClick() {
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          setIsSigningIn(false);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setIsSigningIn(false);
        });
    }
  }

  return (
    <>
    <Header/>
      <TextField
        required
        id="email"
        label="Email:"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <TextField
        required
        id="password"
        label="Password:"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button variant="contained" onClick={handleClick}>
        Login
      </Button>
    </>
  );
}

export default Login;
