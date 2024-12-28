
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Box, Container,List,ListItem } from "@mui/material";
import axios from 'axios'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    number: false,
    specialChar: false,
    capitalLetter: false,
  });

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log('api url', apiUrl);
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(`${apiUrl}/register`, { username, email, password });

      if (response.status === 201 && response.data.message) {
        setMessage(response.data.message);
        navigate("/login");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  // Password validation logic
  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const numberValid = /[0-9]/.test(password);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const capitalLetterValid = /[A-Z]/.test(password);

    setPasswordRules({
      length: lengthValid,
      number: numberValid,
      specialChar: specialCharValid,
      capitalLetter: capitalLetterValid,
    });

    return lengthValid && numberValid && specialCharValid && capitalLetterValid;
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue) {
      const isValid = validatePassword(passwordValue);
      setPasswordError(!isValid);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  // Regex for email validation
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
    <Container
    maxWidth="xs"
    sx={{
      background: "linear-gradient(135deg, #1a1a2e, #16213e)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
      mt:2
    }}
  >
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        borderRadius: 3,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        width: "100%",
        maxWidth: 400,
        color: "#fff",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Create Account
      </Typography>

      {message && (
        <Typography
          sx={{
            marginBottom: 3,
            color: message.includes("failed") ? "red" : "green",
          }}
        >
          {message}
        </Typography>
      )}

      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
        sx={{
          marginBottom: 3,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#ff6f61",
            },
          },
        }}
      />

      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        required
        fullWidth
        error={!isEmailValid && email.length > 0}
        helperText={!isEmailValid && email.length > 0 ? "Invalid email address" : ""}
        sx={{
          marginBottom: 3,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#ff6f61",
            },
          },
        }}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
        required
        fullWidth
        error={passwordError}
        helperText={passwordError ? "Password does not meet criteria" : ""}
        sx={{
          marginBottom: 3,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#ff6f61",
            },
          },
        }}
      />

      <List sx={{ width: "100%", marginBottom: 3, color: "#fff" }}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Password must include:
        </Typography>
        {Object.entries(passwordRules).map(([rule, isValid]) => (
          <ListItem
            key={rule}
            sx={{
              color: isValid ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {rule === "length" && "At least 8 characters"}
            {rule === "number" && "At least one number"}
            {rule === "specialChar" && "At least one special character"}
            {rule === "capitalLetter" && "At least one capital letter"}
          </ListItem>
        ))}
      </List>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isEmailValid || passwordError}
        sx={{
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#ff6f61",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#d9534f",
          },
        }}
      >
        Register
      </Button>
    </Box>
  </Container>
  );
};

export default Register;

