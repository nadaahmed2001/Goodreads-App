import { ChevronLeft, ChevronRight, Globe, Moon, ShoppingCart } from "lucide-react";
import "./Home.css";
import Navbar from "./../../../components/navbar";
import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/api"; // Import API function
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch books from the API
    fetchBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));

    // Fetch user profile if token exists
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => setUser(result.data))
        .catch((error) => console.log(error));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div className="homepage">
      <Navbar />

      {/* Hero Section */}
      <div className='container mt-5'>
        <div className='row align-items-center'>
          <div className='col-md-6'>
            <img
              src='https://i.pinimg.com/736x/7a/11/f5/7a11f5274c6de6f11292725c5a7458a7.jpg'
              alt='Library'
              className='img-fluid rounded hero-image'
              style={{ width: "90rem", height: "25rem" }}
            />
          </div>
          <div className='col-md-6'>
            <h1 className='display-4 fw-bold'>GoodReads</h1>
            <p className='lead'>
              A place where book lovers can find, review, and buy books easily. Discover recommendations, keep a reading list, and shop for your next read—all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Authors Section */}
      <div className='bg-light py-5 mt-5'>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h2 className='fw-bold'>
              <Link to='/AuthorsBook'>Most Popular Authors</Link>
            </h2>
            <div>
              <button className='btn btn-light rounded-circle me-2'>
                <ChevronLeft size={20} />
              </button>
              <button className='btn btn-light rounded-circle'>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className='card'>
            <div className='card-body d-flex align-items-center'>
              <img
                src='/api/placeholder/100/100'
                alt='Author'
                className='rounded-circle me-4'
                style={{ width: "100px", height: "100px" }}
              />
              <div>
                <h3 className='fw-bold'>William Shakespeare</h3>
                <p className='text-muted'>
                  An English playwright, poet, and actor widely regarded as the greatest writer in the English language.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className='container mt-5'>
        <h2 className='fw-bold mb-4'>Most Popular Categories</h2>
        <div className='row g-4'>
          {["Art", "Technology", "Sport", "Economics", "Food", "Health"].map((category, index) => (
            <div key={index} className='col-2'>
              <div className='category-card text-center p-3 rounded'>
                <div className='fs-3 mb-2'>{["🎨", "💻", "⚽", "📈", "🍳", "🏥"][index]}</div>
                <div className='fw-medium'>{category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best-Selling Books Section */}
      <div className='container mt-5'>
        <h2 className='fw-bold mb-4'>Best-Selling Books</h2>
        <div className='row g-4'>
          {books.map((book, index) => (
            <div key={index} className='col-md-3'>
              <div className='card book-card'>
                <img src={book.coverImage} className='card-img-top' alt={book.title} />
                <div className='card-body'>
                  <h4 className='card-title'>{book.title}</h4>
                  <div className='d-flex justify-content-between mt-2'>
                    <span className='text-muted'>⭐⭐⭐⭐⭐</span>
                  </div>
                  <div className='d-grid'>
                    <button className='btn btn-primary'>Add to Cart</button>
                    <button className='btn btn-outline-primary mt-2'>
                      <Link to={`/books/${book._id}`}>View Details</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-primary text-white py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <h5 className='fw-bold mb-3'>Company</h5>
              <ul className='list-unstyled'>
                <li>About us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div className='col-md-3'>
              <h5 className='fw-bold mb-3'>Customer Service</h5>
              <ul className='list-unstyled'>
                <li>FAQ</li>
                <li>Disclaimer</li>
              </ul>
            </div>
          </div>
          <div className='text-center mt-5'>
            <p className='mb-0'>Goodreads</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
