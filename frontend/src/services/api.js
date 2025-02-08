import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchBooks = () => axios.get(`${API_BASE_URL}/`);

export const fetchBookById = (bookId) =>
  axios.get(`${API_BASE_URL}/books/${bookId}`);

export const fetchBookReviews = (bookId) =>
  axios.get(`${API_BASE_URL}/reviews/books/${bookId}/reviews`);

export const addBookToList = async (bookId, shelf, token) => {
  return axios.post(
    `${API_BASE_URL}/add-to-list`,
    { bookId, shelf },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getUserList = async (shelf, token) => {
  // console.log("From api.js: now will request the books from server");
  return axios.get(`${API_BASE_URL}/get-list/${shelf}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeBookFromList = async (bookId, shelf, token) => {
  return axios.delete(`${API_BASE_URL}/remove-from-list/${bookId}/${shelf}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchCategoriesWithBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories-home`);
    // console.log("Data from fetchCategoriesWithBooks api: ", response.data);
    return response.data; //response.data holds categories + books
  } catch (error) {
    // console.error("Error fetching categories", error);
    return { categoryName: "", books: [] };
  }
};

export const fetchCategoryDetails = async (categoryId) => {
  try {
    // console.log("Fetching category details for ID:", categoryId);
    const response = await axios.get(`${API_BASE_URL}/categories-home/${categoryId}`);
    return response.data; // Expected to be { books, categoryName }
  } catch (error) {
    console.error("Error fetching category details", error);
    return { books: [], categoryName: "Unknown Category" }; // ✅ Always return a valid object
  }
};

/*reviews fatma*/
// export const fetchBookReviews = (bookId) =>
//   axios.get(`${API_BASE_URL}/api/books/${bookId}/reviews`);

export const submitReview = async (bookId, review, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/reviews`,
      {
        bookId,
        ...review,
        rating: Number(review.rating),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in submitReview:", error.response || error);
    throw error;
  }
};

//Search
export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?q=${query}`);
    return response.data; // { books, authors, categories }
  } catch (error) {
    console.error("Error fetching search results", error);
    return { books: [], authors: [], categories: [] }; // Return empty results if error
  }
};

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
