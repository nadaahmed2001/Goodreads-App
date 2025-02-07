import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Moon,
  ShoppingCart,
} from "lucide-react";
// import CheckoutButton from "./CheckoutButton"; // Import CheckoutButton
import "./Navbar.css";
import CheckoutButton from "../src/Pages/Payment/CheckoutButton";

const Navbar = () => {
  const [user, setUser] = useState(null); // State for user data from backend
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile if token exists
    let token = localStorage.getItem("token");
    if (!token) {
      token = sessionStorage.getItem("token");
    }
    if (token) {
      axios
        .get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          setUser(result.data); // Set user data
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <>
      <nav>
        <div className="nav-top">
          <div className="imgLogo">
            <img src="../BookAppLogo.png" alt="logo" />
          </div>
          <div className="Searchinput">
            <input
              type="search"
              placeholder="Search titles, authors, publishers..."
              className="form-control search-input"
            />
          </div>
          <div className="d-flex align-items-center icons">
            <button className="btn text-white">
              <Globe size={20} />
            </button>
            <button className="btn text-white">
              <Moon size={20} />
            </button>
            <button className="btn text-white">
              <ShoppingCart size={20} />
            </button>

            {user ? (
              <>
                {/* Use the CheckoutButton here */}
                <CheckoutButton />
                {/* My Lists Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle id="dropdown-lists" className="sign-in-btn">
                    <span className="me-2 fw-medium">My Lists</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/list/currently_reading")}>
                      Currently Reading
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/list/want_to_read")}>
                      Want to Read
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/list/read")}>Read</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* User Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle id="dropdown-user" className="sign-in-btn">
                    <span className="me-2 fw-medium">{user.first_name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to="/sign-up">
                  <button className="sign-in-btn">Sign up</button>
                </Link>
                <Link to="/sign-in">
                  <button className="log-in-btn">Log in</button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="NavList">
          <ul>
            <li>
              <Link to="/" className="hoverlink">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Categories" className="hoverlink">
                Category
              </Link>
            </li>
            <li>
              <Link to="/AuthorsBook" className="hoverlink">
                Authors
              </Link>
            </li>
            <li>
              <Link to="/AboutUs" className="hoverlink">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/TermsConditions" className="hoverlink">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
