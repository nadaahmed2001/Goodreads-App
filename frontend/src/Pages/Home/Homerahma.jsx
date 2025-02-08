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
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { color, margin } from "@mui/system";
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
        <section className="HeroSection">
          <div className="HeroSection-Img">
            <img src="/figma-home.png"></img>
          </div>
          <div className="HeroSection-Con">
            <h1 className='display-4 fw-bold GoodReads'>GoodReads</h1>
            <p>
              A place where book lovers can find, review, and buy books
              easily.<br></br> Discover recommendations, keep reading lists, and shop
              for your next read—all in one place.
            </p>
          </div>
        </section>
          <div className='Con-Au-cat-sec'>
  <section className='PopularAuthorsSection'>
    <Link to='/AuthorsBook' className='removeUnderline'>
      <h3 className='PopularAuthors'>Most Popular Authors</h3>
    </Link>
    {currentAuthor && (
      <Card sx={{ maxWidth: 500, borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
        <CardMedia
          className="Card-home"
          sx={{ height: 500 }}
          image={currentAuthor.image}
          title={currentAuthor.name}
          component="img"
          style={{
            objectFit: 'cover',  
            borderRadius: '8px',  
            boxShadow: '18px 18px 20px rgba(0, 0, 0, 0.3)', 
          }}
        />
        <CardContent sx={{ paddingTop: '16px', textAlign: 'center' }}>  {/* Centering text under image */}
          <Typography gutterBottom variant="h5" component="div" sx={{ color:'465b52',fontWeight: 'bold', marginBottom: '8px' }}>
            {currentAuthor.name}
          </Typography>
          <Typography variant="body2" sx={{ color:'465b52', fontStyle: 'italic',fontSize:'20px' , lineHeight: 1.5 }}>
            {currentAuthor.bio}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}> {/* Centering action buttons */}
          <ArrowBackIosNewIcon
            className="cursorClick"
            onClick={handlePrevAuthor}
          />
          <ArrowForwardIosIcon
            className="cursorClick"
            onClick={handleNextAuthor}
          />
        </CardActions>
      </Card>
    )}
  </section>
          {/* Popular Categories Section */}
          <section className='PopularCategoriesSection'>
            <Link to='/categories-home' className='removeUnderline'>
              <h3 className='PopularCategories'>Most Popular Categories</h3>
            </Link>
            <Card sx={{ maxWidth: 500 }} className="categoryCard" >
              <div className='category-Icons'>
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
                <div className='icon-item'>
                  <GTranslateIcon/>
                  <h5>Language</h5>
                </div>
              </div>
            </Card>

            {/* Quotes Section */}
            <section className='.Best-Selling-Books '>
              <h3 className='PopularQuotes removeUnderline'>Quotes</h3>
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
