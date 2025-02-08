import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategoriesWithBooks } from "../../services/api";
import BookCard from "../../../components/BookCard";
import Navbar from "../../../components/navbar";
import FooterPage from './../Footer/FooterPage';
import { Button } from "react-bootstrap";

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
                <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#088178' }}>
                    Categories
                </h1>

                {/* Categories Grid */}
                <div className="row">
                    {categories.map((category) => (
                        <div key={category._id} className="col-md-6 mb-12">
                            {/* Category Title */}
                            <h2
                                className="text-2xl font-semibold mb-6 text-center text-white py-3 rounded-full shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #088178, #0abab5)',
                                    borderRadius: '50px',
                                    padding: '12px 24px',
                                }}
                            >
                                {category.name}
                            </h2>

                            {/* Books Grid */}
                            <div className="row">
                                {category.books.map((book) => (
                                    <div key={book._id} className="col-md-6 mb-4">
                                        <BookCard book={book} />
                                    </div>
                                ))}
                            </div>

                            {/* View All Button */}
                            <Link to={`/categories-home/${category._id}`} className="mt-4 d-inline-block">
                                <Button variant="outline-secondary" style={{ marginBottom: '20px' }}>
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