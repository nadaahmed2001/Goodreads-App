import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Moon,
  ShoppingCart,
} from "lucide-react";
import "./Home.css";
import Navbar from "./../../../components/navbar";
import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../services/api"; // Import API function
import { Link } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]); // useState used to set the state of the books

  useEffect(() => {
    // Fetch books from the API
    fetchBooks()
      .then((response) => {
        // console.log(response.data); // Log the data to check its structure
        setBooks(response.data); // Set books from API response
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);
  return (
    <div className='homepage'>
      {/* NavBar */}
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
              is a place where books lovers can find, review, and buy books
              easily. Discover recommendations, keep a reading lists, and shop
              for your next read. All in one Place.
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
                  An English playwright, poet, and actor widely regarded as the
                  greatest writer in the English language. Known as the 'Bard of
                  Avon'. His works include 38 plays, 154 sonnets, and two long
                  narrative poems.
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
          {["Art", "Technology", "Sport", "Economics", "Food", "Health"].map(
            (category, index) => (
              <div key={index} className='col-2'>
                <div className='category-card text-center p-3 rounded'>
                  <div className='fs-3 mb-2'>
                    {["🎨", "💻", "⚽", "📈", "🍳", "🏥"][index]}
                  </div>
                  <div className='fw-medium'>{category}</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Best-Selling Books Section */}
      <div className='container mt-5'>
        <h2 className='fw-bold mb-4'>Best-Selling Books</h2>
        <div className='categories-scroll mb-4'>
          {[
            "All Categories",
            "HTML Design",
            "WP Themes",
            "CMS Themes",
            "eCommerce",
            "Blogging",
            "UI Templates",
          ].map((category, index) => (
            <button
              key={index}
              className={`btn me-2 ${
                index === 0 ? "btn-primary" : "btn-light"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className='row g-4'>
          {books.map((book, index) => (
            <div key={index} className='col-md-3'>
              <div className='card book-card'>
                <img
                  src={book.coverImage}
                  className='card-img-top'
                  alt={book.title}
                />
                <div className='card-body'>
                  <h4 className='card-title'>{book.title}</h4>
                  <p className='card-text text-primary fw-bold'>
                    {book.price}$
                  </p>
                  <p className='card-text text-muted'>
                    Author: {book.author.name}
                  </p>
                  <div className='d-flex justify-content-between mt-2'>
                    <span className='text-muted'>⭐⭐⭐⭐⭐</span>
                  </div>
                  <div className='d-grid'>
                    <button className='btn btn-primary'>Add to Cart</button>
                    <button className='btn btn-outline-primary mt-2'>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-5'>
          <button className='btn btn-primary btn-lg'>
            <Link to='/Books'>View All Books</Link>
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className='bg-light py-5 mt-5'>
        <div className='container'>
          <h2 className='text-center fw-bold mb-4'>What Our Clients Say</h2>
          <div className='row g-4'>
            {[1, 2, 3].map((_, index) => (
              <div key={index} className='col-md-4'>
                <div className='card h-100'>
                  <div className='card-body'>
                    <p className='card-text text-muted'>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam adipiscing venenatis quam at tempor. Ut auctor urna ut
                      pellentesque volutpat."
                    </p>
                    <p className='fw-bold mb-0'>Client Name</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-primary text-white py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <h5 className='fw-bold mb-3'>Company</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'>About us</li>
                <li className='mb-2'>Careers</li>
                <li className='mb-2'>Blog</li>
                <li className='mb-2'>Privacy</li>
              </ul>
            </div>
            <div className='col-md-3'>
              <h5 className='fw-bold mb-3'>Work with us</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'>Authors</li>
                <li className='mb-2'>Advertise</li>
                <li className='mb-2'>Affiliate marketing</li>
                <li className='mb-2'>API</li>
              </ul>
            </div>
            <div className='col-md-3'>
              <h5 className='fw-bold mb-3'>Customer service</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'>FAQ</li>
                <li className='mb-2'>Disclaimer</li>
              </ul>
            </div>
            <div className='col-md-3'>
              <h5 className='fw-bold mb-3'>Follow US</h5>
              <div className='social-icons'>
                <span className='me-3'>f</span>
                <span className='me-3'>t</span>
                <span>ig</span>
              </div>
            </div>
          </div>

          <div className='text-center mt-5'>
            <img src='/api/placeholder/40/40' alt='Logo' className='mb-3' />
            <p className='mb-0'>Goodreads</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
