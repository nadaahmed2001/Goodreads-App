import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Fetch all books
export const fetchBooks = () => axios.get(`${API_BASE_URL}/`);
export const fetchBookById = (bookId) =>
  axios.get(`${API_BASE_URL}/books/${bookId}`);

export const addBookToList = async (bookId, shelf, token) => {
  return axios.post(
    `${API_BASE_URL}/add-to-list`,
    { bookId, shelf },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getUserList = async (shelf, token) => {
  return axios.get(`${API_BASE_URL}/get-list/${shelf}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeBookFromList = async (bookId, token) => {
  return axios.delete(`${API_BASE_URL}/remove-from-list/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/*reviews fatma*/
export const fetchBookReviews = (bookId) =>
  axios.get(`${API_BASE_URL}/api/books/${bookId}/reviews`);

export const submitReview = (bookId, reviewData, token) =>
  axios.post(`${API_BASE_URL}/api/books/${bookId}/reviews`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
/*reviews fatma*/

// export const fetchFeaturedBooks = () => axios.get(`${API_BASE_URL}/books/featured`);
// export const fetchTrendingBooks = () => axios.get(`${API_BASE_URL}/books/trending`);
// export const fetchBooksByCategory = (categoryId) => axios.get(`${API_BASE_URL}/books/category/${categoryId}`);

// // Authors API
// export const fetchAuthors = () => axios.get(`${API_BASE_URL}/authors`);
// export const fetchAuthorDetails = (authorId) => axios.get(`${API_BASE_URL}/authors/${authorId}`);

// // Authentication API
// export const loginUser = (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials);
// export const registerUser = (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData);
