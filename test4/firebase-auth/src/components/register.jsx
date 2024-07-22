import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReg, setIsReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userLoggedIn = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    if (!isReg) {
      setIsReg(true);
      await doCreateUserWithEmailAndPassword(email, password)
        .then((user) => {
          setIsReg(false);
          setEmail("");
          setPassword("");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setIsReg(false);
        });
    }
  }

  return (
    <>
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
        Register
      </Button>
    </>
  );
}

export default Register;
