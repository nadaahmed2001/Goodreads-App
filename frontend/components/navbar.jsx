import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ChevronLeft, ChevronRight, Globe, Moon, ShoppingCart } from "lucide-react";
// import CheckoutButton from "./CheckoutButton"; // Import CheckoutButton
import { AuthContext } from "../src/AuthContext"; // Import the context
import "./Navbar.css";
import CheckoutButton from "../src/Pages/Payment/CheckoutButton";

const Navbar = () => {
  const { user, role, logout } = useContext(AuthContext); // Get user, role, and logout function from context
  const navigate = useNavigate();


  return (
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
                  {role === "admin" && (
                    <Dropdown.Item as={Link} to="/categories">
                      Admin Dashboard
                    </Dropdown.Item>
                  )}
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
            <Link to="/" className="hoverlink">
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
  );
};

export default Navbar;