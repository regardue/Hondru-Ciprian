import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../auth";
import Header from "./header";
import { setDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isReg, setIsReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  async function handleClick() {
    if (!isReg) {
      setIsReg(true);
      await doCreateUserWithEmailAndPassword(email, password, birthday, firstName, lastName)
        .then(async (user) => {
          setIsReg(false);
          const userCollection = collection(db, "users");
          console.log(user);
          await setDoc(doc(db, "users", user.user.uid), {
            email: email,
            password: password,
            birthday: birthday,
            firstName: firstName,
            lastName: lastName,
            admin: false,
          });
          setEmail("");
          setPassword("");
          setBirthday("");
          setFirstName("");
          setlastName("");
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
      <Header />
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

<TextField
        required
        id="birthday"
        label="Birthday:"
        value={birthday}
        onChange={(e) => {
          setBirthday(e.target.value);
        }}
      />

<TextField
        required
        id="firstName"
        label="First name:"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />

<TextField
        required
        id="lastName"
        label="Last Name:"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />

      <Button variant="contained" onClick={handleClick}>
        Register
      </Button>
    </>
  );
}

export default Register;
