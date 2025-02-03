import { Globe, Moon } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  const [user, setUser] = useState(null); // State for user data from backend
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile if token exists
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(result => {
        setUser(result.data); // Set user data
      })
      .catch(error => console.log(error));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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

          {user ? (
            <>
              {/* My Lists Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle id="dropdown-lists">
                  <span className="me-2 fw-medium">My Lists</span>
                </Dropdown.Toggle>
                  
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/list/currently_reading")}>Currently Reading</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/list/want_to_read")}>Want to Read</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/list/read")}>Read</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>


              {/* User Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle  id="dropdown-user" >
                  <span className="me-2 fw-medium">{user.first_name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="btn btn-light text-primary ms-2">Sign up</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-outline-light ms-2">Log in</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;