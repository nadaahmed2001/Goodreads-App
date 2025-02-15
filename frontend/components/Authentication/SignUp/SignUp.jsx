import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Modal
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateBtn from "./CreateBtn";
import ShinyText from "../../../src/services/Style/ShinyText";
import { FcGoogle } from "react-icons/fc";

import RotatingText from "./Rotating";



export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = () => {
    window.location.href = "https://goodreads-app-production.up.railway.app/auth/google";
  };
  

  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z0-9]+$/;
    
    if (formData.firstName.length < 4 || !nameRegex.test(formData.firstName)) {
      newErrors.firstName = " must be at least 4 characters (No special characters).";
    }
    if (formData.lastName.length < 4 || !nameRegex.test(formData.lastName)) {
      newErrors.lastName = " must be at least 4 characters (No special characters).";
    }
    if (formData.email.length < 4 || !formData.email.includes("@")) {
      newErrors.email = "Not Valid Email.";
    }
    if (formData.password.length < 6 || !/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "must be at least 6 characters and least one letter.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
  
    if (!validateForm()) return;
    try {
      
      const response = await axios.post("https://goodreads-app-production.up.railway.app/register", {
        email: formData.email
      });
      // console.log("Server Response:", response.data);
        setOtpSent(true);
        setOpenModal(true);
      
    } catch (error) {
      if (error.response) {
        if ( error.response.data.message === "Email already exists" ) {
          setErrors({ email: error.response.data.message });
        } else{
          console.log("Axios Error Response:", error.response);
        } 
      }
     else {
        console.error("Registration error:", error);
      }
    }
  };
  
  const verifyOtp = async () => {
    try {
      // console.log("Verifying OTP with:", {
      //   email: formData.email,
      //   otp: otp.trim(),
      //   first_name: formData.firstName, 
      //   last_name: formData.lastName, 
      //   password: formData.password
      // });
  
      const response = await axios.post("https://goodreads-app-production.up.railway.app/verify-otp", {
        first_name: formData.firstName, 
        last_name: formData.lastName, 
        email: formData.email,
        password: formData.password,
        otp: otp.trim()
      });
  
      console.log("OTP Verification Response:", response.data.message);
      
      if (response.data.message === "OTP Verified") {
        setOpenModal(false);
        navigate("/sign-in");
        alert("Account Created Successfully");
      } else {
        setOtpError("Incorrect OTP, please try again.");
      }
      
    } catch (error) {
      if (error.response)
      {
        console.log("OTP Verification Error:", error);
        setOtpError(error.response.data.message);
      }
      else{      setOtpError("Verification failed. Please try again.");
      }
    }
  };
  
  

  return (
    <Box sx={{ display: "flex", height: "100vh",backgroundImage: "linear-gradient(to bottom,rgb(110, 101, 78),rgba(197, 185, 142, 0.82))" }}>
      <Box sx={{
        flex: 1, display: "flex", alignItems: "center", padding: "50px",
        backgroundImage: 'url("https://c.animaapp.com/Gjklo0yI/img/unsplash-1emwndldhs0.png")',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <Typography variant="h2" sx={{ color: "#000", fontWeight: "bold", lineHeight: 1.2 }}>

          <ShinyText text=" Join With us " disabled={false} speed={2} className='custom-class' /> 
          <br></br>
          <ShinyText text=" and " disabled={false} speed={2.5} className='custom-class' />
          <br></br>
          <ShinyText text=" Enjoy " disabled={false} speed={3} className='custom-class' />
          <br></br>
          <ShinyText text=" The Experience ! " disabled={false} speed={3.5} className='custom-class' />


        </Typography>
      </Box>

      <Box sx={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px",
      }}>
        <img src="/newLogo.png" alt="SHELF-SPHERE"
          style={{ width: 350, marginBottom: 10 }} />

        <Box component="form" onSubmit={handleSubmit} sx={{
          width: "100%", maxWidth: 400, backgroundColor: "rgba(51, 51, 51, 0.5)",
          borderRadius: "10px", padding: "40px",
        }}>
          <TextField fullWidth name="firstName" placeholder="First Name" variant="standard"
            value={formData.firstName} onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName}
            sx={{ 
              mb: 3, 
              input: { color: 'white' }, 
              "& .MuiInput-underline:after": { borderBottomColor: "#bcb499" }, // Custom focus underline color
           
            }}   />

            

          <TextField fullWidth name="lastName" placeholder="Last Name" variant="standard"
            value={formData.lastName} onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName}
            sx={{ 
              mb: 3, 
              input: { color: 'white' }, 
              "& .MuiInput-underline:after": { borderBottomColor: "#bcb499" }, // Custom focus underline color
        
            }}  />

          <TextField fullWidth name="email" placeholder="Email Address" variant="standard"
            value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email}
            sx={{ 
              mb: 3, 
              input: { color: 'white' }, 
              "& .MuiInput-underline:after": { borderBottomColor: "#bcb499" }, // Custom focus underline color
        
            }}  />

          <TextField fullWidth type="password" name="password" placeholder="Password" variant="standard"
            value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password}
            sx={{ 
              mb: 3, 
              input: { color: 'white' }, 
              "& .MuiInput-underline:after": { borderBottomColor: "#bcb499" }, // Custom focus underline color
         
            }}  />

          <TextField fullWidth type="password" name="confirmPassword" placeholder="Confirm Password" variant="standard"
            value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword}
            sx={{ 
              mb: 3, 
              input: { color: 'white' }, 
              "& .MuiInput-underline:after": { borderBottomColor: "#bcb499" },// Custom focus underline color
       
            }}  />

<CreateBtn onClick={handleSubmit} />
  <Button
  fullWidth
  variant="contained"
  onClick={handleGoogleSignUp}
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
  Sign up with Google
</Button>

        </Box>
        <Typography mt={2} fontSize="14px" color="#fff">
            Already have an account?{"  "}
            <Link to="/sign-in" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', position: 'relative' }}>
            <ShinyText text=" SignIn" disabled={false} speed={1.5} className='custom-class' />
            </Link>
          </Typography>
      </Box>

      <Modal
  open={openModal}
  onClose={() => setOpenModal(false)}
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Box
    sx={{
      background: "linear-gradient(145deg, #e8e0c6, #d4c9a8)",
      padding: 4,
      borderRadius: 2,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        color: "#4a3f35",
        fontWeight: "bold",
        mb: 2,
      }}
    >
      Enter OTP
    </Typography>
    <TextField
      fullWidth
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter OTP"
      sx={{
        mt: 2,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#e8e0c6",
          },
          "&:hover fieldset": {
            borderColor: "#d4c9a8",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4a3f35",
          },
        },
      }}
    />
    {otpError && (
      <Typography
        color="error"
        sx={{
          mt: 1,
          fontSize: "0.875rem",
        }}
      >
        {otpError}
      </Typography>
    )}
    <Button
      fullWidth
      onClick={verifyOtp}
      variant="contained"
      sx={{
        mt: 2,
        background: "linear-gradient(145deg, #4a3f35, #6b5c4f)",
        color: "#e8e0c6",
        fontWeight: "bold",
        "&:hover": {
          background: "linear-gradient(145deg, #6b5c4f, #4a3f35)",
        },
      }}
    >
      Verify
    </Button>
  </Box>
</Modal>
      
    </Box>
  );
}
