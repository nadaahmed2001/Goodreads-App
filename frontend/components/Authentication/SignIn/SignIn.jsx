
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ClickSpark from "../../../src/Pages/Profile/ClickSpark";
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', { email, password })
      .then(result => {
        if (result.data.message === "success") {
          if (rememberMe) {
            localStorage.setItem('token', result.data.token);
          } else {
            sessionStorage.setItem('token', result.data.token);
          }
          alert("Logged in successfully");
          navigate('/');
        } else {
          setErrorMessage(result.data.message);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <> 
     <ClickSpark
  sparkColor='#fff'
  sparkSize={12}
  sparkRadius={25}
  sparkCount={10}
  duration={900}
  
/>
      <Grid container sx={{ height: "100vh", backgroundColor: "#3f8fc0" }} alignItems="center" justifyContent="center" >
      <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <img
          alt="Background"
          src="https://c.animaapp.com/Gjklo0yI/img/unsplash-1emwndldhs0.png"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
      </Grid>

      <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box mb={2} textAlign="center">
          <img
            src="https://c.animaapp.com/Gjklo0yI/img/logo-final-3@2x.png"
            alt="Logo"
            width={300}
          />
          <Typography variant="h5" fontWeight="bold" mt={1} color="black">
            Welcome Back!
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "rgba(51, 51, 51, 0.5)",
            padding: "20px",
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <TextField
            label="Enter your email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          />

          <TextField
            label="Enter your password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          />

          <Box display="flex" justifyContent="space-between" mt={1}>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ color: "#fff" }} />}
              label={<Typography sx={{ color: "#fff" }}>Remember me</Typography>}
            />
            <Typography component="a" href="#" sx={{ color: "#fff", textDecoration: "none", fontSize: "14px" }}>
              Forgot password?
            </Typography>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, bgcolor: "#1976d2", color: "#fff", fontWeight: "bold" }}>
            Login
          </Button>
        </Box>

        {errorMessage && <Typography mt={2} color="error">{errorMessage}</Typography>}

        <Typography mt={2} fontSize="14px" color="#fff">
          Don’t have an account?{" "}
          <Link to="/sign-up" style={{
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
    position: 'relative', 
    
  }}>
            Sign Up
          </Link>
        </Typography>
      </Grid>
    </Grid>
            
    </>
  );
}
