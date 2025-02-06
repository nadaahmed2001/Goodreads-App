import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserList, removeBookFromList } from "../../services/api";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import BookCard from "../../../components/BookCard";
import Navbar from "./../../../components/navbar";
import FooterPage from "../Footer/FooterPage";

const UserList = () => {
  const { shelf } = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null); // To display messages
  let token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setError("You need to log in first to access your book list.");
        return;
      }

      try {
        // Fetch books from the user's list
        const response = await getUserList(shelf, token);
        console.log("Fetched books:", response.data.books);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Please try again.");
      }
    };

    fetchBooks();
  }, [shelf, token]);

  const handleRemove = async (bookId) => {
    try {
      console.log("Removing book with ID:", bookId);
      const response = await removeBookFromList(bookId, shelf, token);
      console.log("Response from server:", response.data); // Debugging line
      if (response.data.success) {
        setBooks(books.filter((book) => book.book._id !== bookId)); // Ensure correct book object reference
      }
    } catch (error) {
      console.error("Error removing book:", error);
      setError("Could not remove book. It may not be in your list.");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h2 className="mb-4">{shelf.replace("_", " ").toUpperCase()}</h2>

        {error && <Alert variant="danger">{error}</Alert>} {/* Show error messages */}

        <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
          {/* If books array has items */}
          {books.length > 0 ? (
            books
            .filter((book) => book.book) // Filter out books where book.book is null
            .map((book) => (
              <Col key={book.book._id}>
                <BookCard book={book} />
                <Button
                  variant="danger"
                  className="w-100"
                  onClick={() => handleRemove(book.book._id)}
                >
                  Remove
                </Button>
              </Col>
              ))
          ) : (
            <p className="text-center">No books in this list.</p>
          )}
        </Row>

      </Container>
      <FooterPage />
    </>
  );
};

export default UserList;
