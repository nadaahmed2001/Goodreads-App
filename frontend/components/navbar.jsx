import React from "react";
import { ChevronLeft, ChevronRight, Globe, Moon, ShoppingCart } from 'lucide-react';
import { Link } from "react-router-dom";
import "./Navbar.css";
// import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  
  const login = () => {
    navigate('/sign-in');
  };
  const signup = () => {
    navigate('/sign-up');
  };
    return (
<>

      <nav>
  <div className="nav-top">
    <div className="imgLogo">
      <img src="./public/Untitled.png" alt="logo" />
    </div>
    <div className="Searchinput">
      <input
        type="search"
        placeholder="Search titles, authors, publishers..."
        className="form-control search-input"
      />
    </div>
    <div className="d-flex align-items-center icons">
      <button className="btn text-white"><Globe size={20} /></button>
      <button className="btn text-white"><Moon size={20} /></button>
      <button className="btn text-white"><ShoppingCart size={20} /></button>
      <button className="btn btn-light text-primary ms-2 ">Sign up</button>
      <button className="btn btn-outline-light ms-2 LogIn">Log in</button>
    </div>
  </div>

  
  <div className="NavList">
    <ul>
      <li><a href="">Home</a></li>
      <li><a href="">Category</a></li>
      <li><a href="">Authors</a></li>
      <li><a href="">About Us</a></li>
      <li><a href="">Terms & Conditions</a></li>
    </ul>
  </div>
</nav>

      </>
    );
{/* <nav>
        <div className="imgLogo">
          <img src="./public/Untitled.png" alt="logo" />
          </div>

          <div className="Searchinput">
            <input
              type="search"
              placeholder="Search titles, authors, publishers..."
              className="form-control search-input"
            />
          </div>

          <div className="d-flex align-items-center icons">
            <button className="btn text-white"><Globe size={20} /></button>
            <button className="btn text-white"><Moon size={20} /></button>
            <button className="btn text-white"><ShoppingCart size={20} /></button>
            <button className="btn btn-light text-primary ms-2" onClick={signup}>Sign up</button>
            <button className="btn btn-outline-light ms-2" onClick={login}>Log in</button>
          </div>
        
         <div className="NavList">
        <ul>
          <li><a href="">Home</a></li>
          <li><a href="">Category</a></li>
          <li><a href="">Authors</a></li>
          <li><a href="">About Us</a></li>
          <li><a href="">Terms&condition</a></li>
        </ul>
        </div>
        </nav> */}
      <nav>
  {/* First Line: Logo, Search Bar, and Buttons */}
  <div className="nav-top">
    <div className="imgLogo">
      <img src="./public/Untitled.png" alt="logo" />
    </div>
    <div className="Searchinput">
      <input
        type="search"
        placeholder="Search titles, authors, publishers..."
        className="form-control search-input"
      />
    </div>
    <div className="d-flex align-items-center icons">
      <button className="btn text-white"><Globe size={20} /></button>
      <button className="btn text-white"><Moon size={20} /></button>
      <button className="btn text-white"><ShoppingCart size={20} /></button>
      <button className="btn btn-light text-primary ms-2 ">Sign up</button>
      <button className="btn btn-outline-light ms-2 LogIn">Log in</button>
    </div>
  </div>

  {/* Second Line: Nav List (UL) */}
  <div className="NavList">
    <ul>
      <li><a href="">Home</a></li>
      <li><a href="">Category</a></li>
      <li><a href="">Authors</a></li>
      <li><a href="">About Us</a></li>
      <li><a href="">Terms & Conditions</a></li>
    </ul>
  </div>
</nav>

     
    
};

export default Navbar;





