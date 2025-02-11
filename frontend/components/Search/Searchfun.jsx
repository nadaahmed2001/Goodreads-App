import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../../src/services/api";
import BookCard from "../../components/BookCard";
import Navbar from "../../components/navbar";
import FooterPage from "../../src/Pages/Footer/FooterPage";
import  "./search.css";
const Searchfun = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");

    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchBooks = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const data = await fetchSearchResults(query);
                setBooks(data.books || []);
                setAuthors(data.authors || []);
                setCategories(data.categories || []);
            } catch (error) {
                console.error("Error fetching search results", error);
            }
            setLoading(false);
        };
        searchBooks();
    }, [query]);

    return (
        <div>
            <Navbar />
            <div className="container search-part">
                <h1>Search Results for "{query}"</h1>
                
                {loading ? <p>Loading...</p> : (
                    <>
                        <h2>Books</h2>
                        <div className="row">
                            {books.length === 0 ? <p>No books found</p> : books.map(book => (
                                <div key={book._id} className="col-md-3">
                                    <BookCard book={book} />
                                </div>
                            ))}
                        </div>

                        <h2>Authors</h2>
                        <div className="row">
                            {authors.length === 0 ? <p>No authors found</p> : authors.map(author => (
                                <div key={author._id} className="col-md-3">
                                    <p>{author.name}</p>
                                </div>
                            ))}
                        </div>

                        <h2>Categories</h2>
                        <div className="row">
                            {categories.length === 0 ? <p>No categories found</p> : categories.map(category => (
                                <div key={category._id} className="col-md-3">
                                    <p>{category.name}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <FooterPage />
            
        </div>
        
    );
};

export default Searchfun;
