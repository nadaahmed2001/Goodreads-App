// BooksList.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchBooks } from "../../services/api";
import BookCard from "../../../components/BookCard";
import Navbar from "../../../components/navbar";

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

  if (loading) return <div className='text-center my-5'>Loading...</div>;

  return (
    <>
      <Navbar />

      <Container fluid='xxl' className='my-5 py-3 py-lg-4 min-vh-100'>
        <h2 className='display-5 display-md-4 display-lg-3 text-center text-md-start mb-4 px-2 px-md-0'>
          All Books
        </h2>

        {loading ? (
          <div className='text-center my-5'>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row className='g-4 justify-content-center flex-wrap'>
            {books.map((book) => (
              <Col
                key={book._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                xxl={2}
                className='d-flex'
              >
                <BookCard book={book} className='flex-grow-1 shadow-hover' />
              </Col>
            ))}
          </Row>
        )}

        {!loading && books.length === 0 && (
          <div className='text-center py-5'>
            <h3 className='text-muted'>No books found</h3>
            <p className='lead'>Check back later for new additions!</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default BooksList;
