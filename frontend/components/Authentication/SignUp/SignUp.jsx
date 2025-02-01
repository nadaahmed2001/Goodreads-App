import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, InputAdornment, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box sx={{
      display: "flex",
      height: "100vh",
      backgroundColor: "#3f8fc0",
    }}>
      {/* Left Section */}
      <Box sx={{
        flex: 1,
        display: "flex",
        alignItems: "flex-center",
        padding: "50px",
        backgroundImage: 'url("https://c.animaapp.com/Gjklo0yI/img/unsplash-1emwndldhs0.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Typography variant="h2" sx={{ 
          color: "#000",
          fontWeight: "bold",
          lineHeight: 1.2 
        }}>
          Join With us<br />and <br /> Enjoy<br />The Experience !
        </Typography>
      </Box>

      {/* Right Section */}
      <Box sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
      }}>
        <img
          src="https://c.animaapp.com/Gjklo0yI/img/logo-final-3@2x.png"
          alt="SHELF-SPHERE"
          style={{ width: 350, marginBottom: 10 }}
        />
       
        <Box sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "rgba(51, 51, 51, 0.5)",
          borderRadius: "10px",
          padding: "40px",
        }}>
          <TextField
            fullWidth
            placeholder="Full Name"
            variant="standard"
            sx={{
              mb: 3,
              input: { color: 'white' },
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' },
            }}
          />
          <TextField
            fullWidth
            placeholder="Email Address"
            variant="standard"
            sx={{
              mb: 3,
              input: { color: 'white' },
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' },
            }}
          />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'white' }}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 4,
              input: { color: 'white' },
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#d9d9d9",
              color: "#333",
              py: 1.5,
              mb: 3,
              '&:hover': { backgroundColor: "#c0c0c0" },
            }}
          >
            Create Account
          </Button>

          <Typography sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
            -Or create account via email-
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<GoogleIcon />}
                sx={{ backgroundColor: 'white', color: '#333', '&:hover': { backgroundColor: "#f5f5f5" } }}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<FacebookIcon />}
                sx={{ backgroundColor: 'white', color: '#333', '&:hover': { backgroundColor: "#f5f5f5" } }}
              >
                Facebook
              </Button>
            </Grid>
          </Grid>

          <Typography sx={{ color: 'white', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/sign-in" style={{ color: 'white', fontWeight: 'bold' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
