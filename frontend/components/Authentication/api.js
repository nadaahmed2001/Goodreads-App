// api.js
import axios from 'axios';

const API_URL = "http://localhost:5000";  // Update this with your backend URL

export const sendOtp = (email) => {
  return axios.post(`${API_URL}/send-otp`, { email });
};

export const verifyOtp = (email, otp) => {
  return axios.post(`${API_URL}/verify-otp`, { email, otp });
};

// Google and Facebook Authentication can be handled via Passport.js routes
export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`; // Redirects to Google OAuth
};
