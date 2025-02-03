// BooksList.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchBooks } from "../../services/api";
import BookCard from "../../../components/BookCard";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await fetchBooks();
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooksData();
  }, []);

  const handleAddToCart = (book) => {
    // Handle add to cart logic here
    console.log("Added to cart:", book);
  };

  if (loading) return <div className='text-center my-5'>Loading...</div>;

  return (
    <Container className='my-5'>
      <h2 className='mb-4'>All Books</h2>
      <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
        {books.map((book) => (
          <Col key={book._id}>
            <BookCard book={book} onAddToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BooksList;
