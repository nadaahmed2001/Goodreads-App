import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { fetchBooks } from "../src/services/api";
import BookCard from "./BookCard";

const BookListSection = ({ title }) => {
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

  if (loading) {
    return (
      <Container className='text-center my-5'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <Container fluid='lg' className='my-5 py-4'>
        <h2 className='text-center text-md-start mb-4 display-5 fw-bold'>
          {title}
        </h2>
        {loading ? (
          <div className='text-center my-5'>
            <Spinner animation='border' variant='primary' />
            <p className='visually-hidden'>Loading...</p>
          </div>
        ) : (
          <>
            <Row className='g-4'>
              {books.map((book) => (
                <Col key={book._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                  <BookCard
                    book={book}
                    className='h-100 shadow-sm hover-shadow'
                  />
                </Col>
              ))}
            </Row>

            {books.length === 0 && !loading && (
              <div className='text-center my-5 py-5'>
                <h4 className='text-muted'>No books found</h4>
                <p className='lead'>Check back later for new additions!</p>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default BookListSection;
