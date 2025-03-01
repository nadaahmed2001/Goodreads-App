import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBook, FaList } from "react-icons/fa";
import AdminTxt from './AdminPanelTxt';

const Sidebar = () => {
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="d-flex flex-column vh-100 p-3"
            style={{ width: "240px", position: "sticky", top: 0, background: 'linear-gradient(100deg,rgb(36, 36, 35),rgb(83, 83, 83))' }}
        >
            {/*   background: linear-gradient(135deg, #59461B, #8B7355);
 */}
            <Navbar.Brand className="my-3">
                <AdminTxt />

            </Navbar.Brand>
            <Nav.Link as={Link} to="/" className="text-white-50 mb-5">
                <button className="learn-more">
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text fw-medium text-white">
                        Home
                    </span>
                </button>
            </Nav.Link>
            <Nav className="flex-column w-100">
                <Nav.Link as={Link} to="/categories" className="text-white nv">
                    <FaList className="me-2" /> Categories
                </Nav.Link>
                <Nav.Link as={Link} to="/ManageBooks" className="text-white nv">
                    <FaUsers className="me-2" /> Books
                </Nav.Link>
                <Nav.Link as={Link} to="/authors" className="text-white nv">
                    <FaBook className="me-2" /> Authors
                </Nav.Link>
                <Nav.Link as={Link} to="/SalesChart" className="text-white nv">
                    <FaTachometerAlt className="me-2" /> Charts
                </Nav.Link>
            </Nav>

        </Navbar>
    );
};

export default Sidebar;
