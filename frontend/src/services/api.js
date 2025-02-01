import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Fetch all books
export const fetchBooks = () => axios.get(`${API_BASE_URL}/`);
// export const fetchFeaturedBooks = () => axios.get(`${API_BASE_URL}/books/featured`);
// export const fetchTrendingBooks = () => axios.get(`${API_BASE_URL}/books/trending`);
// export const fetchBooksByCategory = (categoryId) => axios.get(`${API_BASE_URL}/books/category/${categoryId}`);



// // Authors API
// export const fetchAuthors = () => axios.get(`${API_BASE_URL}/authors`);
// export const fetchAuthorDetails = (authorId) => axios.get(`${API_BASE_URL}/authors/${authorId}`);

// // Authentication API
// export const loginUser = (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials);
// export const registerUser = (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData);
