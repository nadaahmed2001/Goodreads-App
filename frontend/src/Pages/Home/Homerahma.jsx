import "./Homerahma.css";
import Navbar from "../../../components/navbar";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FooterPage from "../Footer/FooterPage";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import BiotechIcon from "@mui/icons-material/Biotech";
import BalanceIcon from "@mui/icons-material/Balance";
import PaletteIcon from "@mui/icons-material/Palette";
import { color } from "@mui/system";
import BookListSection from "../../../components/BookListSection";
import CustomButton from "../../../components/CustomButton";

const HomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);

  // Quotes logic
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
    },
    {
      quote:
        "Your time is limited, so don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      quote:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
  ];

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevQuote = () => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const currentQuote = quotes[currentQuoteIndex];

  // Fetch Books
  useEffect(() => {
    fetchBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => setUser(result.data))
        .catch((error) => console.log(error));
    }
  }, []);

  // Fetch Authors
  useEffect(() => {
    axios
      .get("http://localhost:5000/authors")
      .then((response) => setAuthors(response.data))
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/sign-in");
  };

  const handlePrevAuthor = () => {
    setCurrentAuthorIndex((prevIndex) =>
      prevIndex === 0 ? authors.length - 1 : prevIndex - 1
    );
  };

  const handleNextAuthor = () => {
    setCurrentAuthorIndex((prevIndex) =>
      prevIndex === authors.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentAuthor = authors[currentAuthorIndex];

  return (
    <>
      <div className='homepage'>
        <Navbar />

        {/* Hero Section */}
        <div className='containeri mt-5'>
          <div className='row align-items-center'>
            <div className='col-md-6'></div>
            <div className='col-md-6'>
              <h1 className='display-4 fw-bold GoodReads'>GoodReads</h1>
              <p className='lead1' style={{ color: "white" }}>
                A place where book lovers can find, review, and buy books
                easily. Discover recommendations, keep reading lists, and shop
                for your next read—all in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Authors Section */}
        <div className='Con-Au-cat-sec'>
          <section className='PopularAuthorsSection'>
            <Link to='/AuthorsBook' className='removeUnderline'>
              <h3 className='PopularAuthors'>Most Popular Authors</h3>
            </Link>

            {currentAuthor && (
              <Card sx={{ maxWidth: 500 }} className='Card-home'>
                <CardMedia
                  sx={{ height: 500 }}
                  image={currentAuthor.image}
                  title={currentAuthor.name}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {currentAuthor.name}
                  </Typography>
                  <Typography variant='body2' sx={{ color: "text.secondary" }}>
                    {currentAuthor.bio}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ArrowBackIosNewIcon
                    className='cursorClick'
                    onClick={handlePrevAuthor}
                  />
                  <ArrowForwardIosIcon
                    className='cursorClick'
                    onClick={handleNextAuthor}
                  />
                </CardActions>
              </Card>
            )}
          </section>
          {/* Popular Categories Section */}
          <section className='PopularCategoriesSection'>
            <Link to='/AuthorsBook' className='removeUnderline'>
              <h3 className='PopularCategories'>Most Popular Categories</h3>
            </Link>
            <Card sx={{ maxWidth: 500 }} className='Card-home'>
              <div className='catIcons'>
                <div className='icon-item'>
                  <FastfoodIcon />
                  <h5>Food</h5>
                </div>
                <div className='icon-item'>
                  <SportsSoccerIcon />
                  <h5>Sports</h5>
                </div>
                <div className='icon-item'>
                  <FavoriteIcon />
                  <h5>Love</h5>
                </div>
                <div className='icon-item'>
                  <MedicalInformationIcon />
                  <h5>Health</h5>
                </div>
                <div className='icon-item'>
                  <BiotechIcon />
                  <h5>Science</h5>
                </div>
                <div className='icon-item'>
                  <BalanceIcon />
                  <h5>Law</h5>
                </div>
                <div className='icon-item'>
                  <PaletteIcon />
                  <h5>Art</h5>
                </div>
              </div>
            </Card>

            {/* Quotes Section */}
            <section className='PopularQuotes'>
              <Link to='/AuthorsBook' className='removeUnderline'>
                <h3 className='PopularQuotes'>Quotes</h3>
              </Link>
              <Card sx={{ maxWidth: 500 }} className='Card-home'>
                <CardContent>
                  <Typography variant='body2' sx={{ color: "text.secondary" }}>
                    <p className='Quote-body'>"{currentQuote.quote}"</p>
                    <br />
                    <em className='Quote-author2'>
                      - <b className='Quote-author'>Author</b>:
                      {currentQuote.author}
                    </em>
                  </Typography>
                </CardContent>
                <CardActions>
                  <ArrowBackIosNewIcon
                    className='cursorClick'
                    onClick={handlePrevQuote}
                  />
                  <ArrowForwardIosIcon
                    className='cursorClick'
                    onClick={handleNextQuote}
                  />
                </CardActions>
              </Card>
            </section>
          </section>
        </div>

        {/* Best-Selling Books Section */}
        {/* <section className="Best-Selling-Books">
          <h2 className="fw-bold mb-4">Best-Selling Books</h2>
          <div className="containerBooks mt-5">
            <div className="row g-4">
              {books.map((book, index) => (
                <div key={index} className="col-md-3">
                  <div className="card book-card">
                    <img src={book.coverImage} className="card-img-top" alt={book.title} />
                    <div className="card-body">
                      <h4 className="card-title">{book.title}</h4>
                      <p className="text-muted">Author: {book.author?.name}</p>
                      <div className="d-flex justify-content-between mt-2">
                        <span className="text-muted">⭐⭐⭐⭐⭐</span>
                      </div>
                      <div className="d-grid">
                        <Link to={`/books/${book._id}`}>
                          <button className="btn btn-outline-primary mt-2 view-details">View Details</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-5">
            <Link to="/books">
              <button className="btn btn-primary btn-lg View-All-Books">View All Books</button>
            </Link>
          </div>
        </section> */}

        {/* <section className="Best-Selling-Books">
          <h2 className="fw-bold mb-4">Best-Selling Books</h2>
          <div className="containerBooks mt-5">
            <div className="row g-4">
              {books.map((book, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card book-card">
                    <img src={book.coverImage} className="card-img-top" alt={book.title} />
                    <div className="card-body">
                      <h4 className="card-title">{book.title}</h4>
                      <p className="text-muted">Author: {book.author?.name}</p>
                      <div className="d-flex justify-content-between mt-2">
                        <span className="text-muted">⭐⭐⭐⭐⭐</span>
                      </div>
                      <div className="d-grid">
                        <Link to={`/books/${book._id}`}>
                          <button className="btn btn-outline-primary mt-2 view-details">View Details</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-5">
            <Link to="/books">
              <button className="btn btn-primary btn-lg View-All-Books">View All Books</button>
            </Link>
          </div>
        </section> */}

        <BookListSection title='Best-Selling Books' />

        <div className='text-center mt-5'>
          <Link to='/books'>
            <CustomButton className='btn btn-primary btn-lg View-All-Books'>
              View All Books
            </CustomButton>
          </Link>
        </div>

        <FooterPage />
      </div>
    </>
  );
};

export default HomePage;
