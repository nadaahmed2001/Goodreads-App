import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategoriesWithBooks } from "../../services/api";
import BookCard from "../../../components/BookCard";
import Navbar from "../../../components/navbar";
import FooterPage from './../Footer/FooterPage';
import { Button } from "react-bootstrap";
import './Category.css'
const CategoriesHome = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategoriesWithBooks();
            setCategories(data);
        };
        getCategories();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                {/* Page Title */}
                <h1 className="category-title" > Categories </h1>

                {/* Categories Grid */}
                <div className="row">
                    {categories.map((category) => (
                        <div key={category._id} className="col-md-6 mb-12">
                            {/* Category Title */}
                            <h2
                                className="category-name"
                            >
                                <hr></hr>
                                {category.name}
                            </h2>
<hr></hr>
                            {/* Books Grid */}
                            <div className="row">
                                {category.books.map((book) => (
                                    <div key={book._id} className="col-md-4 mb-4">
                                        <BookCard book={book} />
                                    </div>
                                ))}
                            </div>

                            {/* View All Button */}
                            <Link to={`/categories-home/${category._id}`} className="mt-4 d-inline-block">
                                <Button variant="outline-secondary" className="viewAllbtn">
                                    View All →
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <FooterPage />
        </>
    );
};

export default CategoriesHome;