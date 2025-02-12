import "./Homerahma.css";
import Navbar from "../../../components/navbar";
import { useEffect, useState, useContext } from "react";
import { fetchBooks } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FooterPage from "../Footer/FooterPage";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import FastfoodIcon from "@mui/icons-material/Fastfood";
// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy"; // Drama
import AutoStoriesIcon from "@mui/icons-material/AutoStories"; // Fantasy
import SearchIcon from "@mui/icons-material/Search"; // Mystery
import MoodBadIcon from "@mui/icons-material/MoodBad"; // Horror
import MenuBookIcon from "@mui/icons-material/MenuBook"; // Fiction
import PersonIcon from "@mui/icons-material/Person"; // Biography
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
// import BiotechIcon from "@mui/icons-material/Biotech";
// import BalanceIcon from "@mui/icons-material/Balance";
// import PaletteIcon from "@mui/icons-material/Palette";
// import GTranslateIcon from '@mui/icons-material/GTranslate';
import { color, margin } from "@mui/system";
import BookListSection from "../../../components/BookListSection";
// import CustomButton from "../../../components/CustomButton";
import AIChatbot from "../../../components/Chatbot/AIChatbt";
import LanguageContext from "../../context/language";
// import SplitText from '../../../components/SplitText';
import styled from "styled-components";
import SplitText from "../../../components/SplitText";

const PageContainer = styled.div`
  background-color: var(--bg-beige) !important;
  color: var(--text-brown) !important;
`;

const HeroSection = styled.section`
  color: var(--text-brown) !important;
`;

const HeroImage = styled.div`
  flex: 1 1 300px;
  img {
    width: 100%;
    max-width: 500px;
    height: 370px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const HeroContent = styled.div`
  flex: 1 1 300px;
  text-align: left;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-brown) !important;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.5;
    color: var(--text-brown) !important;
  }
`;

const HomeAuthors = styled.div`
  background-color: var(--bg-box) !important;
  color: var(--text-brown) !important;
  //  border: 1px solid var(--border-no) !important;
  box-shadow:
    0 2px 6px rgb(255 255 255 / 45%),
    0 8px 24px rgb(255 255 255 / 24%);
  h3 {
    color: var(--text-brown) !important;
  }
`;

const HomeCategory = styled.div`
  background-color: var(--bg-box) !important;
  color: var(--text-brown) !important;
  //  border: 1px solid var(--border-no) !important;
  box-shadow:
    0 2px 6px rgb(255 255 255 / 45%),
    0 8px 24px rgb(255 255 255 / 24%);
  h3 {
    color: var(--text-brown) !important;
  }
`;

const HomeQoutes = styled.div`
  background-color: var(--bg-box) !important;
  color: var(--text-brown) !important;
  //  border: 1px solid var(--border-no) !important;
  box-shadow:
    0 2px 6px rgb(255 255 255 / 45%),
    0 8px 24px rgb(255 255 255 / 24%);
  h3 {
    color: var(--text-brown) !important;
  }
`;
const AllBooks = styled.button`
  border: 1px solid var(--text-brown) !important;
  color: var(--text-beige) !important;
  transition: color 0.3s ease;
  border-radius: 10px;
  background: var(--bg-btn);
  box-shadow:
    0 2px 6px rgb(255 255 255 / 45%),
    0 8px 24px rgb(255 255 255 / 24%);

  &:hover {
    border-color: var(--text-brown-hover);
    color: var(--text-brown-hover);
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);
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
        .get("https://goodreads-app-production.up.railway.app//profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => setUser(result.data))
        .catch((error) => console.log(error));
    }
  }, []);
  // Fetch Authors
  useEffect(() => {
    axios
      .get("https://goodreads-app-production.up.railway.app/authors")
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
      <PageContainer>
        <Navbar />
        <HeroSection className='HeroSection'>
          <HeroImage className='HeroSection-Img'>
            <img src='/figma-home.png'></img>
          </HeroImage>
          <HeroContent className='HeroSection-Con'>
            <h1 className='display-4 fw-bold'>
              {language === "en" ? "Shelf-sphere" : "كوكب الرفوف"}
            </h1>

            {/* {language === "en" ? ( */}
            <p className='lead'>
              <SplitText />
              {/* A place where book lovers can find, review, and buy books
                easily.<br></br> Discover recommendations, keep reading lists,
                and shop for your next read—all in one place. */}
            </p>
            {/* ) : ( */}
            {/* <SplitText /> */}
            {/* // <p className='lead'>
              //   مكان يمكن لعشاق الكتب فيه العثور على الكتب و مراجعتها وشرائها
              //   بسهولة.<br></br> اكتشف التوصيات، احتفظ بقوائم القراءة، وتسوق
              //   لقراءتك التالية - كل ذلك في مكان واحد.
              // </p> */}
            {/* )} */}
          </HeroContent>
        </HeroSection>
        {/* <div className='Con-Au-cat-sec'>
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
                <CardContent sx={{ paddingTop: '16px', textAlign: 'center' }}>   Centering text under image 
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '465b52', fontWeight: 'bold', marginBottom: '8px' }}>
                    {currentAuthor.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '465b52', fontStyle: 'italic', fontSize: '20px', lineHeight: 1.5 }}>
                    {currentAuthor.bio}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}> {/* Centering action buttons 
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
           Popular Categories Section 
          <section className='PopularCategoriesSection'>
            <Link to='/categories-home' className='removeUnderline'>
              <h3 className='PopularCategories'>Most Popular Categories</h3>
            </Link>

            <Card sx={{ maxWidth: 500 }} className="categoryCard">
              <div className='category-Icons'>
                <div className='icon-item'>
                  <TheaterComedyIcon />
                  <h5>Drama</h5>
                </div>
                <div className='icon-item'>
                  <AutoStoriesIcon />
                  <h5>Fantasy</h5>
                </div>
                <div className='icon-item'>
                  <SearchIcon />
                  <h5>Mystery</h5>
                </div>
                <div className='icon-item'>
                  <MoodBadIcon />
                  <h5>Horror</h5>
                </div>
                <div className='icon-item'>
                  <MenuBookIcon />
                  <h5>Fiction</h5>
                </div>
                <div className='icon-item'>
                  <PersonIcon />
                  <h5>Biography</h5>
                </div>
              </div>
            </Card>

             Quotes Section 
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
        </div>*/}

        {/* new section felhome zy el figma */}
        <section className='Home-middle'>
          <HomeAuthors className='Home-authors'>
            <Link to='/AuthorsBook' className='Home-authors-title'>
              {language === "en" ? (
                <h3>Most Popular Authors</h3>
              ) : (
                <h3>المؤلفين الأكثر شهرة</h3>
              )}
              {/* <h3>Most Popular Authors</h3> */}
            </Link>
            {currentAuthor && (
              <>
                <div className='Author-name-img-bio'>
                  <div className='Author-name-img'>
                    <img src={currentAuthor.image}></img>
                    <p className='Author-name'>{currentAuthor.name}</p>
                  </div>
                  <div className='Author-bio'>
                    <p> {currentAuthor.bio}</p>
                  </div>
                </div>
              </>
            )}
            <div className='cursors'>
              <ArrowBackIosNewIcon
                className='cursorClick'
                onClick={handlePrevAuthor}
              />
              <ArrowForwardIosIcon
                className='cursorClick'
                onClick={handleNextAuthor}
              />
            </div>
          </HomeAuthors>

          <HomeCategory className='Home-category'>
            <Link to='/categories-home' className='Home-category-title'>
              <h3>
                {language === "en"
                  ? "Most Popular Categories"
                  : "أكثر الفئات شهرة"}
              </h3>
            </Link>
            <div className='Home-category-Icons'>
              <div className='Home-category-item'>
                <TheaterComedyIcon />
                <h5>{language === "en" ? "Drama" : "دراما"}</h5>
              </div>
              <div className='Home-category-item'>
                <AutoStoriesIcon />
                <h5>{language === "en" ? "Fantasy" : "خيال"}</h5>
              </div>
              <div className='Home-category-item'>
                <SearchIcon />
                <h5>{language === "en" ? "Mystery" : "غموض"}</h5>
              </div>
              <div className='Home-category-item'>
                <MoodBadIcon />
                <h5>{language === "en" ? "Horror" : "رعب"}</h5>
              </div>
              <div className='Home-category-item'>
                <MenuBookIcon />
                <h5>{language === "en" ? "Fiction" : "خيال"}</h5>
              </div>
              <div className='Home-category-item'>
                <PersonIcon />
                <h5>{language === "en" ? "Biography" : "سيرة ذاتية"}</h5>
              </div>
            </div>

            <HomeQoutes className='Home-qoutes'>
              <h3 className='Home-qoutes-title'>
                {language === "en" ? "Quotes" : "اقتباسات"}
              </h3>
              <div className='quote-body'>
                <p>{currentQuote.quote}</p>
                <em>
                  -<b>{language === "en" ? "Author" : "المؤلف"}</b>:
                  {currentQuote.author}
                </em>
              </div>
              <div className='cursor2'>
                <ArrowBackIosNewIcon
                  className='cursorClick'
                  onClick={handlePrevQuote}
                />
                <ArrowForwardIosIcon
                  className='cursorClick'
                  onClick={handleNextQuote}
                />
              </div>
            </HomeQoutes>
          </HomeCategory>
        </section>

        <h2 className='Best-Selling-Books'>
          {language === "en" ? "Best-Selling Books" : "أفضل الكتب مبيعًا"}
        </h2>
        <BookListSection />
        <div className='text-center mt-5'>
          <Link to='/books'>
            <AllBooks className='View-All-Books mb-5'>
              {language === "en" ? "View All Books" : "عرض جميع الكتب"}
            </AllBooks>
          </Link>
        </div>
        <AIChatbot />
      </PageContainer>
      <FooterPage />
    </>
  );
};

export default HomePage;
