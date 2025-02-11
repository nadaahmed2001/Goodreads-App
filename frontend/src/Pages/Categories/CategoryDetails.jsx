import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategoryDetails } from "../../services/api";
import BookCard from "../../../components/BookCard";
import Navbar from "../../../components/navbar";
import FooterPage from './../Footer/FooterPage';
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const [books, setBooks] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const data = await fetchCategoryDetails(categoryId);
            setBooks(data.books);
            setCategoryName(data.categoryName);
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
            <h1>Books in {categoryName}</h1>
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
           
            <Link to="/categories-home"> <Button  variant="outline-secondary">Back to categories</Button></Link>
            
        </div>
        <FooterPage />
        </div>
    );
};

export default CategoryDetails;