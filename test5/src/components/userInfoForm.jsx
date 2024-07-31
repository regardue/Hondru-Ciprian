import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { TextField, Button, Box } from '@mui/material';

function UserInfoForm() {
    const { updateUserInfo } = useAuth();
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      birthday: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await updateUserInfo(formData);
    };
  
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Birthday"
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    );
  }
  
  export default UserInfoForm;