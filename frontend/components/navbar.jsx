// import React, { useContext, useState } from "react"; // Import useState
// import { useNavigate, Link } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";
// import { ChevronLeft, ChevronRight, Globe, Moon, ShoppingCart } from "lucide-react";
// import { AuthContext } from "../src/AuthContext"; // Import the context
// import "./Navbar.css";
// import CheckoutButton from "../src/Pages/Payment/CheckoutButton";
// import SearchIcon from '@mui/icons-material/Search';

// const Navbar = () => {

//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     setIsOpen(false); // Close dropdown after selection
//   };
//   const { user, role, subscription, logout } = useContext(AuthContext); // Get user, role, and logout function from context
//   const navigate = useNavigate();

//   const [query, setQuery] = useState(""); //  Define query state to store the search query

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${encodeURIComponent(query)}`); //encodeURIcomponent to encode the query string.
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-top">
//         <div className="imgLogo">
//           <img src="/newLogo.png" alt="logo" />
//         </div>
//         <div className="Searchinput">
//           {/* <form onSubmit={handleSearch}>
//             <input
//               type="search"
//               placeholder="Search titles, authors, publishers..."
//               className="form-control search-input"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)} //  Update query state
//             />
//             <SearchIcon></SearchIcon>
//           </form> */}
//           <div className="Searchinput">
//   <form onSubmit={handleSearch}>
//     <div className="input-container">
//       <input
//         type="search"
//         placeholder="Search titles, authors, publishers..."
//         className="form-control search-input"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)} // Update query state
//       />
//       <SearchIcon className="search-icon" />
//     </div>
//   </form>
// </div>

//         </div>

//         <div className="d-flex align-items-center icons">
//         <button className="btn text-white" onClick={toggleDropdown}>
//         <Globe size={20} />
//         {selectedLanguage} {/* Display the selected language */}
//       </button>
//           <button className="btn text-white">
//             <Moon size={20} />
//             <span>  |  Dark Mood</span>
//           </button>

//           {/* Use the CheckoutButton here */}
//           {user ? (
//             <>
//               {(subscription === 'InActive' && role === "user") && <CheckoutButton />}
//               {/* My Lists Dropdown */}
//               <Dropdown align="end">
//                 <Dropdown.Toggle id="dropdown-lists" className="sign-in-btn">
//                   <span className="me-2 fw-medium">My Lists</span>
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                   <Dropdown.Item onClick={() => navigate("/list/currently_reading")}>
//                     Currently Reading
//                   </Dropdown.Item>
//                   <Dropdown.Item onClick={() => navigate("/list/want_to_read")}>
//                     Want to Read
//                   </Dropdown.Item>
//                   <Dropdown.Item onClick={() => navigate("/list/read")}>Read</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>

//               {/* User Dropdown */}
//               <Dropdown align="end">
//                 <Dropdown.Toggle id="dropdown-user" className="sign-in-btn">
//                   <span className="me-2 fw-medium">{user.first_name}</span>
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                   {role === "admin" && (
//                     <Dropdown.Item as={Link} to="/categories">
//                       Admin Dashboard
//                     </Dropdown.Item>
//                   )}
//                   <Dropdown.Item as={Link} to="/profile">
//                     Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </>
//           ) : (
//             <>
//               <Link to="/sign-up">
//                 <button className="sign-in-btn">Sign up</button>
//               </Link>
//               <Link to="/sign-in">
//                 <button className="log-in-btn">Log in</button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="NavList">
//         <ul>
//           <li>
//             <Link to="/" className="hoverlink">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/categories-home" className="hoverlink">
//               Category
//             </Link>
//           </li>
//           <li>
//             <Link to="/AuthorsBook" className="hoverlink">
//               Authors
//             </Link>
//           </li>
//           <li>
//             <Link to="/AboutUs" className="hoverlink">
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/TermsConditions" className="hoverlink">
//               Terms & Conditions
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   Navbar as BSNavbar,
//   Nav,
//   NavDropdown,
//   Container,
//   Form,
//   FormControl,
//   Button,
// } from "react-bootstrap";
// import { Globe, Moon } from "lucide-react";
// import { AuthContext } from "../src/AuthContext";
// import CheckoutButton from "../src/Pages/Payment/CheckoutButton";
// import SearchIcon from "@mui/icons-material/Search";
// import "./Navbar.css";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("English");
//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     setIsOpen(false);
//   };

//   const { user, role, subscription, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${encodeURIComponent(query)}`);
//     }
//   };

//   return (
//     <BSNavbar expand='lg' variant='light' className='custom-navbar'>
//       <Container>
//         <img
//           src='/newLogo.png'
//           as={Link}
//           to='/'
//           alt='logo'
//           className='logo-img'
//         />

//         <BSNavbar.Toggle aria-controls='basic-navbar-nav' />
//         <BSNavbar.Collapse id='basic-navbar-nav'>
// <Nav className='me-auto c-second'>
//   <Nav.Link
//     as={Link}
//     to='/'
//     className='hoverlink   c-second c-second-hover fs-7'
//   >
//     Home
//   </Nav.Link>
//   <Nav.Link
//     as={Link}
//     to='/categories-home'
//     className='hoverlink c-second c-second-hover fs-7'
//   >
//     Category
//   </Nav.Link>
//   <Nav.Link
//     as={Link}
//     to='/AuthorsBook'
//     className='hoverlink c-second c-second-hover fs-7'
//   >
//     Authors
//   </Nav.Link>
//   <Nav.Link
//     as={Link}
//     to='/AboutUs'
//     className='hoverlink c-second c-second-hover fs-7'
//   >
//     About Us
//   </Nav.Link>
//   <Nav.Link
//     as={Link}
//     to='/TermsConditions'
//     className='hoverlink c-second c-second-hover fs-7'
//   >
//     Terms & Conditions
//   </Nav.Link>
// </Nav>

// <Form
//   className='d-flex'
//   onSubmit={handleSearch}
//   style={{ position: "relative" }}
// >
//   <FormControl
//     type='search'
//     placeholder='Search titles, authors, publishers...'
//     className=' search-input relative'
//     value={query}
//     onChange={(e) => setQuery(e.target.value)}
//   />
//   <Button
//     variant='outline-secondary'
//     type='submit'
//     className='search-icon'
//   >
//     <SearchIcon />
//   </Button>
// </Form>

//           <Nav className='ms-auto d-flex align-items-center icons'>
//             <Button
//               variant='link'
//               className='text-white'
//               onClick={toggleDropdown}
//             >
//               <Globe size={20} />
//             </Button>
//             <Button variant='link' className='text-white'>
//               <Moon size={20} />
//             </Button>
//             {user ? (
//               <>
//                 {subscription === "InActive" && role === "user" && (
//                   <CheckoutButton />
//                 )}
//                 <NavDropdown title='My Lists' id='dropdown-lists' align='end'>
//                   <NavDropdown.Item
//                     onClick={() => navigate("/list/currently_reading")}
//                   >
//                     Currently Reading
//                   </NavDropdown.Item>
//                   <NavDropdown.Item
//                     onClick={() => navigate("/list/want_to_read")}
//                   >
//                     Want to Read
//                   </NavDropdown.Item>
//                   <NavDropdown.Item onClick={() => navigate("/list/read")}>
//                     Read
//                   </NavDropdown.Item>
//                 </NavDropdown>
//                 <NavDropdown
//                   title={user.first_name}
//                   id='dropdown-user'
//                   align='end'
//                 >
//                   {role === "admin" && (
//                     <NavDropdown.Item as={Link} to='/categories'>
//                       Admin Dashboard
//                     </NavDropdown.Item>
//                   )}
//                   <NavDropdown.Item as={Link} to='/profile'>
//                     Profile
//                   </NavDropdown.Item>
//                   <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
//                 </NavDropdown>
//               </>
//             ) : (
//               <>
//                 <Nav.Link as={Link} to='/sign-up' className='sign-in-btn  '>
//                   Sign up
//                 </Nav.Link>
//                 <Nav.Link as={Link} to='/sign-in' className='log-in-btn '>
//                   Log in
//                 </Nav.Link>
//               </>
//             )}
//           </Nav>
//         </BSNavbar.Collapse>
//       </Container>
//     </BSNavbar>
//   );
// };

// export default Navbar;
/////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   Navbar as BSNavbar,
//   Nav,
//   NavDropdown,
//   Container,
//   Form,
//   FormControl,
//   Button,
// } from "react-bootstrap";
// import { Globe, Moon } from "lucide-react";
// import { AuthContext } from "../src/AuthContext";
// import CheckoutButton from "../src/Pages/Payment/CheckoutButton";
// import SearchIcon from "@mui/icons-material/Search";
// import "./Navbar.css";
// import LanguageContext from "../src/context/language";

// const Navbar = () => {
//   // const [isOpen, setIsOpen] = useState(false);
//   // // const [selectedLanguage, setSelectedLanguage] = useState("English");
//   const { language, setLanguage } = useContext(LanguageContext);
//   // const toggleDropdown = () => setIsOpen(!isOpen);
//   // const handleLanguageChange = (language) => {
//   //   setSelectedLanguage(language);
//   //   setIsOpen(false);
//   // };

//   const { user, role, subscription, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${encodeURIComponent(query)}`);
//     }
//   };

//   return (
//     <>

//       <BSNavbar expand='xl' variant='light' className='custom-navbar'>
//   <Container fluid className="navbar-container">
//     {/* Logo - Left Side */}
//     <BSNavbar.Brand as={Link} to="/" className="logo-container">
//       <img
//         src='/newLogo.png'
//         alt='logo'
//         className='logo-img'
//       />
//     </BSNavbar.Brand>

//      <Form
//   className='d-flex'
//   onSubmit={handleSearch}
//   style={{ position: "relative" }}
// >
//   <FormControl
//     type='search'
//     placeholder='Search titles, authors, publishers...'
//     className=' search-input relative'
//     value={query}
//     onChange={(e) => setQuery(e.target.value)}
//   />
//   <Button
//     variant='outline-secondary'
//     type='submit'
//     className='search-icon'
//   >
//     <SearchIcon />
//   </Button>
// </Form>

//     {/* Centered Navigation Links */}
//     <BSNavbar.Toggle aria-controls='basic-navbar-nav' />
//     <BSNavbar.Collapse id='basic-navbar-nav' className="nav-links-container">
//       <Nav className="mx-auto navbar-main-links">
//         <Nav.Link as={Link} to='/' className='hoverlink'>
//           {language === "en" ? "Home" : "الصفحة الرئيسية"}
//         </Nav.Link>
//         <Nav.Link as={Link} to='/categories-home' className='hoverlink'>
//           {language === "en" ? "Category" : "الفئة"}
//         </Nav.Link>
//         <Nav.Link as={Link} to='/AuthorsBook' className='hoverlink'>
//           {language === "en" ? "Authors" : "المؤلفون"}
//         </Nav.Link>
//         <Nav.Link as={Link} to='/AboutUs' className='hoverlink'>
//           {language === "en" ? "About Us" : "معلومات عنا"}
//         </Nav.Link>
//         <Nav.Link as={Link} to='/TermsConditions' className='hoverlink'>
//           {language === "en" ? "Terms & Conditions" : "الشروط والأحكام"}
//         </Nav.Link>
//       </Nav>

//       <Nav className="ms-auto navbar-right-items">

//         <div className="language-selector">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="form-select"
//           >
//             <option value="en">EN</option>
//             <option value="ar">AR</option>
//           </select>
//         </div>

//         {user ? (
//           <>
//             <NavDropdown title='My Lists' id='dropdown-lists'>

//             </NavDropdown>
//             <NavDropdown title={user.first_name} id='dropdown-user'>

//             </NavDropdown>
//           </>
//         ) : (
//           <>
//             <Nav.Link as={Link} to='/sign-up' className='sign-in-btn'>
//               {language === "en" ? "Sign up" : "سجل"}
//             </Nav.Link>
//             <Nav.Link as={Link} to='/sign-in' className='log-in-btn'>
//               {language === "en" ? "Log in" : "تسجيل الدخول"}
//             </Nav.Link>
//           </>
//         )}
//       </Nav>
//     </BSNavbar.Collapse>
//   </Container>
// </BSNavbar>

//     </>
//   );
// };

// export default Navbar;
////////////////////////////////////////////////////////////////////////////////
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Navbar as BSNavbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Globe, Moon } from "lucide-react";
import { AuthContext } from "../src/AuthContext";
import CheckoutButton from "../src/Pages/Payment/CheckoutButton";
import SearchIcon from "@mui/icons-material/Search";
import LanguageContext from "../src/context/language";
import DarkModeToggle from "./DarkModeToggle";
import styled from "styled-components";
import "./Navbar.css";

const StyledNavbar = styled(BSNavbar)`
  background-color: var(--bg-beige) !important;
  box-shadow:
    0 2px 6px rgb(255 255 255 / 45%),
    0 8px 24px rgb(255 255 255 / 24%);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1001;
  .navbar-brand img {
    max-height: 80px;
  }

  .nav-link {
    color: var(--text-brown) !important;
    border-color: var(--text-brown) !important;
    font-weight: 500;
    transition: color 0.3s ease;
    border-radius: 10px;
  }
  .nav-link:hover {
    color: var(--text-brown-hover) !important;
    border-color: var(--text-brown-hover) !important;
  }
  .language-selector .form-select {
    background-color: var(--bg-beige) !important;
    color: var(--text-brown) !important;
    border-color: transparent !important;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 0px 30px 0px 10px;
  }

  .nav-link:hover {
    color: var(--text-brown-hover) !important;
  }

  .navbar-container form input,
  .navbar-container .search-icon {
    background-color: transparent !important;
    color: var(--text-brown) !important;
    border-color: var(--text-brown) !important;
    transition: color 0.3s ease;
    border-radius: 10px;
  }
  .navbar-container .search-icon {
    margin-left: 5px;
  }
  .navbar-container form input::placeholder {
    color: var(--text-brown) !important;
    font-size: 13px;
  }

  .navbar-toggler {
    background-color: var(--bg-beige) !important;
    border: none;
  }
  .dropdown-menu.show {
    background-color: var(--bg-beige) !important;
    color: var(--text-brown) !important;
  }
  .dropdown-item {
    color: var(--text-brown) !important;
  }
`;

const Navbar = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { user, role, subscription, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <StyledNavbar expand='xl' variant='light' className='custom-navbar'>
        <Container fluid className='navbar-container'>
          {/* Logo - Left Side */}
          <BSNavbar.Brand as={Link} to='/' className='logo-container'>
            <img src='../src/assets/logo latest.png' alt='logo' className='logo-img' />
          </BSNavbar.Brand>

          <Form
            className='d-flex'
            onSubmit={handleSearch}
            style={{ position: "relative" }}
          >
            <FormControl
              type='search'
              placeholder='Search titles, authors, publishers...'
              className=' search-input relative'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant='outline-secondary'
              type='submit'
              className='search-icon'
            >
              <SearchIcon />
            </Button>
          </Form>

          {/* Centered Navigation Links */}
          <BSNavbar.Toggle aria-controls='basic-navbar-nav' />
          <BSNavbar.Collapse
            id='basic-navbar-nav'
            className='nav-links-container'
          >
            <Nav className='mx-auto navbar-main-links'>
              <Nav.Link as={Link} to='/' className='hoverlink'>
                {language === "en" ? "Home" : "الصفحة الرئيسية"}
              </Nav.Link>
              <Nav.Link as={Link} to='/categories-home' className='hoverlink'>
                {language === "en" ? "Category" : "الفئة"}
              </Nav.Link>
              <Nav.Link as={Link} to='/AuthorsBook' className='hoverlink'>
                {language === "en" ? "Authors" : "المؤلفون"}
              </Nav.Link>
              <Nav.Link as={Link} to='/AboutUs' className='hoverlink'>
                {language === "en" ? "About Us" : "معلومات عنا"}
              </Nav.Link>
              <Nav.Link as={Link} to='/TermsConditions' className='hoverlink'>
                {language === "en" ? "Terms & Conditions" : "الشروط والأحكام"}
              </Nav.Link>
            </Nav>

            <Nav className='ms-auto navbar-right-items'>
              <div className=' '>
                <DarkModeToggle />
              </div>

              <div className='language-selector'>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className='form-select'
                >
                  <option value='en'>EN</option>
                  <option value='ar'>AR</option>
                </select>
              </div>

              {/* User Dropdowns and Actions */}
              {user ? (
                <>
                  {subscription === "InActive" && role === "user" && (
                    <CheckoutButton />
                  )}
                  <NavDropdown title='My Lists' id='dropdown-lists'>
                    <NavDropdown.Item
                      onClick={() => navigate("/list/currently_reading")}
                    >
                      {language === "en"
                        ? "Currently Reading"
                        : "القراءة الحالية"}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => navigate("/list/want_to_read")}
                    >
                      {language === "en" ? "Want to Read" : "أريد أن أقرأ"}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/list/read")}>
                      {language === "en" ? "Read" : "قرأت"}
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title={user.first_name} id='dropdown-user'>
                    {role === "admin" && (
                      <NavDropdown.Item as={Link} to='/categories'>
                        {language === "en" ? "Admin Dashboard" : "لوحة التحكم"}
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item as={Link} to='/profile'>
                      {language === "en" ? "Profile" : "الملف الشخصي"}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>
                      {language === "en" ? "Logout" : "تسجيل الخروج"}
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to='/sign-up' className='sign-in-btn'>
                    {language === "en" ? "Sign up" : "سجل"}
                  </Nav.Link>
                  <Nav.Link as={Link} to='/sign-in' className='log-in-btn'>
                    {language === "en" ? "Log in" : "تسجيل الدخول"}
                  </Nav.Link>
                </>
              )}
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </StyledNavbar>
    </>
  );
};

export default Navbar;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
