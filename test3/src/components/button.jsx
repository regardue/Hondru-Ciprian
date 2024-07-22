import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export default function BasicButtons() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    password: "",
  });

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s-]+$/;
    return name.length >= 2 && name.length <= 50 && nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateId = (id) => {
    const idRegex = /^[A-Za-z0-9]+$/;
    return id.length >= 5 && idRegex.test(id);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validationFunctions = {
    firstName: validateName,
    lastName: validateName,
    email: validateEmail,
    id: validateId,
    password: validatePassword,
  };

  const errorMessages = {
    firstName:
      "Invalid name. It should be between 2 and 50 characters and contain only alphabets.",
    lastName:
      "Invalid name. It should be between 2 and 50 characters and contain only alphabets.",
    email: "Invalid email address.",
    id: "Invalid ID. It should be at least 5 characters and contain only alphanumeric characters.",
    password:
      "Invalid password. It should be at least 8 characters and include a mix of uppercase, lowercase, numbers, and special characters.",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((last) => ({ ...last, [name]: value }));

    const isValid = validationFunctions[name](value);
    setErrors((last) => ({
      ...last,
      [name]: isValid ? "" : errorMessages[name],
    }));
  };

  const handleClick = async () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(user).forEach((key) => {
      const isFieldValid = validationFunctions[key](user[key]);
      newErrors[key] = isFieldValid ? "" : errorMessages[key];
      if (!isFieldValid) isValid = false;
    });

    setErrors(newErrors);

    if (isValid) {
      const usersCollection = collection(db, "register_form");
      await addDoc(usersCollection, user);
    }

    setUser({
        firstName: "",
        lastName: "",
        email: "",
        id: "",
        password: "",
      });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic1"
          label="First Name"
          name="firstName"
          variant="outlined"
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          id="outlined-basic1"
          label="Last Name"
          name="lastName"
          variant="outlined"
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <br />
        <TextField
          id="outlined-basic1"
          label="E-mail"
          name="email"
          variant="outlined"
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <br />
        <TextField
          id="outlined-basic2"
          label="Id"
          name="id"
          variant="outlined"
          onChange={handleChange}
          error={!!errors.id}
          helperText={errors.id}
        />
        <br />
        <TextField
          id="outlined-basic3"
          label="Password"
          name="password"
          variant="outlined"
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Box>
      <Stack spacing={2} direction="row">
        <Button variant="text" onClick={handleClick}>
          Send
        </Button>
      </Stack>
    </>
  );
}
