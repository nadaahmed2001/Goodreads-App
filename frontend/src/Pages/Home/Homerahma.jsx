import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Homerahma.css";
import Navbar from "./../../../components/navbar";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FooterPage from "../Footer/FooterPage";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const HomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));

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
              A place where book lovers can find, review, and buy books easily. Discover recommendations, keep reading lists, and shop for your next read—all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Authors Section */}
      <section className="section2">
      <section className="PopularAuthorsSection">
      <Link to='/AuthorsBook'><h3 className='PopularAuthors'>Most Popular Authors</h3></Link>
      <Card sx={{ maxWidth: 500}}> 
      <CardMedia
        sx={{ height: 500 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent className="Card-home">
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions  className="Card-home">
        <ArrowBackIosNewIcon />
       <ArrowForwardIosIcon />
      </CardActions>
    </Card>
    </section>
      {/* Categories Section */}
      <section className="PopularCategoriesSection">
      <Link to='/AuthorsBook'><h3 className='PopularCategories'>Most Popular Categories</h3></Link>
      <Card sx={{ maxWidth: 500}} > 
      <CardMedia 
        sx={{ height: 100 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent className="Card-home">
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions className="Card-home">
        <ArrowBackIosNewIcon />
       <ArrowForwardIosIcon />
      </CardActions>
    </Card>
    {/* Quotes Books Section */}
    <section className="QuotesSection">
      <Link to='/AuthorsBook'><h3 className='PopularQuotes'>Quotes</h3></Link>
      <Card sx={{ maxWidth: 500}}> 
      <CardMedia
        sx={{ height: 100 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent className="Card-home">
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions  className="Card-home">
        <ArrowBackIosNewIcon />
       <ArrowForwardIosIcon />
      </CardActions>
    </Card>
    </section>
    </section>
    </section>
    <section className="section3">
    <div className='container mt-5'>
        <h2 className='fw-bold mb-4 Best-Selling-Books'>Best-Selling Books</h2>
        <div className='row g-4'>
          {books.map((book, index) => (
            <div key={index} className='col-md-3'>
              <div className='card book-card'>
                <img src={book.coverImage} className='card-img-top' alt={book.title} />
                <div className='card-body'>
                  <h4 className='card-title'>{book.title}</h4>
                  <p className='text-muted'>Author: {book.author?.name}</p>
                  <div className='d-flex justify-content-between mt-2'>
                    <span className='text-muted'>⭐⭐⭐⭐⭐</span>
                  </div>
                  <div className='d-grid'>
                    <Link to={`/books/${book._id}`}>
                      <button className='btn btn-outline-primary mt-2 view-details'>View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-5'>
          <Link to='/books'>
            <button className='btn btn-primary btn-lg View-All-Books'>View All Books</button>
          </Link>
        </div>
      </div>
      </section>
     
      <FooterPage />
    </div>
    
  );
};

export default HomePage;
