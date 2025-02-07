import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Alert,
} from "@mui/material";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!email || !token) {
      setError("Invalid or missing reset token.");
    }
  }, [email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#3f51b5" }}>
          Reset Password
        </Typography>

        {error && (
          <>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "#3f51b5",
                borderColor: "#3f51b5",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                },
              }}
              onClick={() => navigate("/sign-in")} // Redirect to /sign-in
            >
              Back to Login
            </Button>
          </>
          
        )}

        {message && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        {!error && (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              type="password"
              label="Enter new password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
                mb: 2, // Add margin bottom
              }}
            >
              Reset Password
            </Button>

            {/* Login Button */}
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "#3f51b5",
                borderColor: "#3f51b5",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                },
              }}
              onClick={() => navigate("/sign-in")} // Redirect to /sign-in
            >
              Back to Login
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPassword;