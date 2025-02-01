import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBook, FaList } from "react-icons/fa";

const Sidebar = () => {
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="d-flex flex-column vh-100 p-3"
            style={{ width: "240px" }}
        >
            <Navbar.Brand className="mb-4">Admin Panel</Navbar.Brand>
            <Nav className="flex-column w-100">
                {/* <Nav.Link as={Link} to="/dashboard" className="text-white">
                    <FaTachometerAlt className="me-2" /> Dashboard
                </Nav.Link> */}
                <Nav.Link as={Link} to="/categories" className="text-white">
                    <FaList className="me-2" /> Categories
                </Nav.Link>
                <Nav.Link as={Link} to="/ManageBooks" className="text-white">
                    <FaUsers className="me-2" /> Books
                </Nav.Link>
                <Nav.Link as={Link} to="/authors" className="text-white">
                    <FaBook className="me-2" /> Authors
                </Nav.Link>
            </Nav>

        </Navbar>
    );
};

export default Sidebar;
