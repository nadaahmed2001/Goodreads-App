import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategoryDetails } from "../../services/api";
import BookCard from "../../../components/BookCard";
import Navbar from "../../../components/navbar";
import FooterPage from './../Footer/FooterPage';
import { useParams } from "react-router-dom";

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const data = await fetchCategoryDetails(categoryId);
            setBooks(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching books", error);
            setLoading(false);
        }
        };
    
        fetchBooks();
    }, [categoryId]);
    
    return (
        <div>
        <Navbar />
        <div className="container">
            <h1>Books in this category</h1>
            <div className="row">
            {loading ? (
                <p>Loading...</p>
            ) : books.length === 0 ? (
                <p>No books found</p>
            ) : (
                books.map((book) => (
                <div key={book._id} className="col-md-3">
                    <BookCard key={book._id} book={book} />
                </div>
                ))
            )}
            </div>
            <Link to="/categories-home">Back to categories</Link>
        </div>
        <FooterPage />
        </div>
    );
};

export default CategoryDetails;