import React from "react";
import { ChevronLeft, ChevronRight, Globe, Moon, ShoppingCart } from 'lucide-react';

import { Link } from "react-router-dom";
// import "./Navbar.css";

const Navbar = () => {
    return (

<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="/api/placeholder/40/40" alt="Logo" className="rounded-circle me-2" />
            <span>Goodreads</span>
          </a>

          <div className="d-flex flex-grow-1 justify-content-center px-4">
            <input
              type="search"
              placeholder="Search titles, authors, publishers..."
              className="form-control search-input"
            />
          </div>

          <div className="d-flex align-items-center">
            <button className="btn text-white"><Globe size={20} /></button>
            <button className="btn text-white"><Moon size={20} /></button>
            <button className="btn text-white"><ShoppingCart size={20} /></button>
            <button className="btn btn-light text-primary ms-2">Sign up</button>
            <button className="btn btn-outline-light ms-2">Log in</button>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;