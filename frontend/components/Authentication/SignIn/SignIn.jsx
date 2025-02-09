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
import Switch from './Switch';
import ShinyText from "../../../src/services/Style/ShinyText";
import LoginBtn from "./Loginbtn";
import { color } from "@mui/system";
import RotatingText from "../SignUp/Rotating";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.checked ? 'admin' : 'user');
  };
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', { email, password, role })
    .then(result => {
      if (result.data.message === "success") {
        if (rememberMe) {
          localStorage.setItem('token', result.data.token);
        } else {
          sessionStorage.setItem('token', result.data.token);
        }
        alert("Logged in successfully");
        navigate('/');
        window.location.reload(); // 🔥 Force full page reload
      } 
    })
    .catch(error => {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    });
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
      
      <Grid container sx={{ height: "100vh", backgroundColor: "#3f8fc0" }} alignItems="center" justifyContent="center">
        {/* Left Side - Full Height Image and Text */}
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" }, height: "100vh" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              padding: "50px",
              backgroundImage: 'url("https://c.animaapp.com/Gjklo0yI/img/unsplash-1emwndldhs0.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Typography variant="h2" sx={{ color: "#000", fontWeight: "bold", lineHeight: 1.2 }}>
              <ShinyText text=" Don't Miss" disabled={false} speed={2} className='custom-class' /> 
              <br></br>
  <RotatingText
    texts={['Focus', 'Empathy', 'Insight', 'Escape','Relaxation']}
    mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
    staggerFrom={"last"}
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "-120%" }}
    staggerDuration={0.1}
    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
    transition={{ type: "spring", damping: 15, stiffness: 1000 }}
    rotationInterval={5000}
  />
              <br></br>
              <ShinyText text=" With " disabled={false} speed={3} className='custom-class' />
              <br></br>
  <RotatingText
    texts={['Growth', 'Clarity', 'Imagination', 'Knowledge']}
    mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
    staggerFrom={"last"}
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "120%" }}
    staggerDuration={0.030}
    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
    transition={{ type: "spring", damping: 30, stiffness: 150 }}
    rotationInterval={6000}
  />
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Sign In Form */}
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Box mb={2} textAlign="center">
            <img
              src="https://c.animaapp.com/Gjklo0yI/img/logo-final-3@2x.png"
              alt="Logo"
              width={300}
            />
            <Typography variant="h5" fontWeight="bold" mt={1} color="black">
              <ShinyText text="Welcome Back!" disabled={false} speed={2} className='custom-class' />
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
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" justifyContent="space-between" mt={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": { color: "#000000a4" },
                      "& .MuiSvgIcon-root": { fontSize: 28 },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  >
                    Remember me
                  </Typography>
                }
                sx={{
                  marginTop: "-8px",
                  alignItems: "center",
                }}
              />

              <Typography component="a" href="/forgot-password" sx={{ color: "#fff", textDecoration: "none", fontSize: "14px" }}>
                Forgot password?
              </Typography>
            </Box>

            <Box display="flex" justifyContent="left" sx={{ width: "auto" }}>
              <Switch role={role} onChange={handleRoleChange} sx={{ width: "auto", minWidth: "unset" }} />
            </Box>
            <LoginBtn onClick={handleSubmit} />
   <Button
   
  fullWidth
  variant="contained"
  onClick={handleGoogleSignIn}
  sx={{
    mt: 2,
    backgroundColor: "#ffffff",
    color: "#000",
    fontWeight: "bold",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#f7f7f7",
      transform: "scale(1.05)",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
    },
  }}
>
  <FcGoogle size={24} />
  Sign in with Google
</Button>

          </Box>

          {errorMessage && <Typography mt={2} color="error">{errorMessage}</Typography>}

          <Typography mt={2} fontSize="14px" color="#fff">
            Don’t have an account?{"  "}
            <Link to="/sign-up" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', position: 'relative' }}>
              <ShinyText text=" SignUp" disabled={false} speed={1.5} className='custom-class' />
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}