import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // will develope later
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin && onLogin(credentials); // will develope later
        navigate("/Categories");
    };


    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('/src/assets/login.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 4,
                        boxShadow: 3,
                        borderRadius: 2,
                        bgcolor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Admin Login
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" onClick={(e) => handleSubmit} fullWidth sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminLogin;
