// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { fetchCategoryDetails } from "../../services/api";
// import BookCard from "../../../components/BookCard";
// import Navbar from "../../../components/navbar";
// import FooterPage from './../Footer/FooterPage';
// import { useParams } from "react-router-dom";
// import { Button } from "react-bootstrap";

// const CategoryDetails = () => {
//     const { categoryId } = useParams();
//     const [books, setBooks] = useState([]);
//     const [categoryName, setCategoryName] = useState("");
//     const [loading, setLoading] = useState(true);
    
//     useEffect(() => {
//         const fetchBooks = async () => {
//         try {
//             const data = await fetchCategoryDetails(categoryId);
//             setBooks(data.books);
//             setCategoryName(data.categoryName);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching books", error);
//             setLoading(false);
//         }
//         };
    
//         fetchBooks();
//     }, [categoryId]);
    
//     return (
//         <div>
//         <Navbar />
//         <div className="container">
//             <h1>Books in {categoryName}</h1>
//             <div className="row">
//             {loading ? (
//                 <p>Loading...</p>
//             ) : books.length === 0 ? (
//                 <p>No books found</p>
//             ) : (
//                 books.map((book) => (
//                 <div key={book._id} className="col-md-3">
//                     <BookCard key={book._id} book={book} />
//                 </div>
//                 ))
//             )}
//             </div>
           
//             <Link to="/categories-home"> <Button  variant="outline-secondary">Back to categories</Button></Link>
            
//         </div>
//         <FooterPage />
//         </div>
//     );
// };

// export default CategoryDetails;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategoryDetails } from "../../services/api";
import BookCard from "../../../components/BookCard";
import Navbar from "../../../components/navbar";
import FooterPage from '../Footer/FooterPage';
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

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
        <>
            <Navbar />
            <Container className="my-5 py-4" style={{ maxWidth: "960px" }}>
                <Card className="border-0 bg-transparent">
                    <Card.Header className="m-auto text-light mb-0 bg-transparent border-0">
                        <div className="d-flex align-items-center justify-center gap-3">
                            <h1 className="mb-0 display-5 c-main">Books in {categoryName}</h1>
                        </div>
                    </Card.Header>

                    <Card.Body className="p-4">
                        <div className="row">
                            {loading ? (
                                <p>Loading...</p>
                            ) : books.length === 0 ? (
                                <p>No books found</p>
                            ) : (
                                books.map((book) => (
                                    <div key={book._id} className="col-md-4 mb-4">
                                        <BookCard book={book} />
                                    </div>
                                ))
                            )}
                        </div>
                        <Link to="/categories-home">
                            <Button variant="outline-custom" className="mt-3">
                                Back to Categories
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
            <FooterPage />

            <style>
                {`
                    .outline-custom {
                        color: #59461B;
                        border-color: #59461B;
                    }

                    .outline-custom:hover {
                        background-color: #59461B;
                        color: white;
                    }
                `}
            </style>
        </>
    );
};

export default CategoryDetails;