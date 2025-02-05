
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, InputAdornment, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // New state for confirm password
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z0-9]+$/; // Only letters and numbers (no spaces or special characters)
    
    if (formData.firstName.length < 4 || !nameRegex.test(formData.firstName)) {
      newErrors.firstName = "First name must be at least 4 characters (No special characters).";
    }

    if (formData.lastName.length < 4 || !nameRegex.test(formData.firstName)) {
      newErrors.lastName = "Last name must be at least 4 characters (No special characters).";
    } 
    
    if (formData.email.length < 4 || !formData.email.includes("@")) {
      newErrors.email = "Not Valid Email.";
    }

    if (formData.password.length < 6 || !/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Password must be at least 6 characters and contain at least one letter.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    try {
      const response = await axios.post("http://localhost:5000/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "user",
        create_at: new Date().toLocaleString(),
      });

      if (response.data === "Email Already Exist") {
        setErrors({ email: "Email already exists! Please use a different email." });
      } else {
        alert("Account Created Successfully");
        navigate('/sign-in');
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#3f8fc0" }}>
      {/* Left Section */}
      <Box sx={{
        flex: 1, display: "flex", alignItems: "center", padding: "50px",
        backgroundImage: 'url("https://c.animaapp.com/Gjklo0yI/img/unsplash-1emwndldhs0.png")',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <Typography variant="h2" sx={{ color: "#000", fontWeight: "bold", lineHeight: 1.2 }}>
          Join With us<br />and <br /> Enjoy<br />The Experience !
        </Typography>
      </Box>

      {/* Right Section */}
      <Box sx={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px",
      }}>
        <img src="https://c.animaapp.com/Gjklo0yI/img/logo-final-3@2x.png" alt="SHELF-SPHERE"
          style={{ width: 350, marginBottom: 10 }} />

        <Box component="form" onSubmit={handleSubmit} sx={{
          width: "100%", maxWidth: 400, backgroundColor: "rgba(51, 51, 51, 0.5)",
          borderRadius: "10px", padding: "40px",
        }}>
          <TextField fullWidth name="firstName" placeholder="First Name" variant="standard"
            value={formData.firstName} onChange={handleChange}
            error={!!errors.firstName} helperText={errors.firstName}
            sx={{ mb: 3, input: { color: 'white' }, '& .MuiInput-underline:before': { borderBottomColor: 'white' } }}
          />

          <TextField fullWidth name="lastName" placeholder="Last Name" variant="standard"
            value={formData.lastName} onChange={handleChange}
            error={!!errors.lastName} helperText={errors.lastName}
            sx={{ mb: 3, input: { color: 'white' }, '& .MuiInput-underline:before': { borderBottomColor: 'white' } }}
          />

          <TextField fullWidth name="email" placeholder="Email Address" variant="standard"
            value={formData.email} onChange={handleChange}
            error={!!errors.email} helperText={errors.email}
            sx={{ mb: 3, input: { color: 'white' }, '& .MuiInput-underline:before': { borderBottomColor: 'white' } }}
          />

          <TextField fullWidth type={showPassword ? 'text' : 'password'} name="password"
            placeholder="Password" variant="standard" value={formData.password} onChange={handleChange}
            error={!!errors.password} helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'white' }}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3, input: { color: 'white' }, '& .MuiInput-underline:before': { borderBottomColor: 'white' } }}
          />

          <TextField fullWidth type="password" name="confirmPassword"
            placeholder="Confirm Password" variant="standard" value={formData.confirmPassword} onChange={handleChange}
            error={!!errors.confirmPassword} helperText={errors.confirmPassword}
            sx={{ mb: 4, input: { color: 'white' }, '& .MuiInput-underline:before': { borderBottomColor: 'white' } }}
          />

          <Button fullWidth type="submit" variant="contained"
            sx={{ backgroundColor: "#d9d9d9", color: "#333", py: 1.5, mb: 3, '&:hover': { backgroundColor: "#c0c0c0" } }}>
            Create Account
          </Button>

          <Typography sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
            -Or create account via email-
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" startIcon={<GoogleIcon />}
                sx={{ backgroundColor: 'white', color: '#333', '&:hover': { backgroundColor: "#f5f5f5" } }}>
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" startIcon={<FacebookIcon />}
                sx={{ backgroundColor: 'white', color: '#333', '&:hover': { backgroundColor: "#f5f5f5" } }}>
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
