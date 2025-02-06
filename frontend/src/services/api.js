import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Fetch all books
export const fetchBooks = () => axios.get(`${API_BASE_URL}/`);
export const fetchBookById = (bookId) =>
  axios.get(`${API_BASE_URL}/books/${bookId}`);

export const fetchReviewsByBookId = async (bookId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${bookId}/rating`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const addBookToList = async (bookId, shelf, token) => {
  return axios.post(
    `${API_BASE_URL}/add-to-list`,
    { bookId, shelf },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getUserList = async (shelf, token) => {
  console.log("From api.js: now will request the books from server");
  return axios.get(`${API_BASE_URL}/get-list/${shelf}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeBookFromList = async (bookId, shelf, token) => {
  return axios.delete(`${API_BASE_URL}/remove-from-list/${bookId}/${shelf}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// export const fetchFeaturedBooks = () => axios.get(`${API_BASE_URL}/books/featured`);
// export const fetchTrendingBooks = () => axios.get(`${API_BASE_URL}/books/trending`);
// export const fetchBooksByCategory = (categoryId) => axios.get(`${API_BASE_URL}/books/category/${categoryId}`);


