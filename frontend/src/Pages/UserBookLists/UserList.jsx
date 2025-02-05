import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserList, removeBookFromList } from "../../services/api";
import { Container, Row, Col, Button } from "react-bootstrap";
import BookCard from "../../../components/BookCard";

const UserList = () => {
  const { shelf } = useParams();
  const [books, setBooks] = useState([]);
 let token = localStorage.getItem("token");
if(!token)
{
  token = sessionStorage.getItem("token");
}
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getUserList(shelf, token);
        console.log("Fetched books:", response.data.books); // Debugging
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [shelf, token]);

  const handleRemove = async (bookId) => {
    try {
      await removeBookFromList(bookId, token);
      setBooks(books.filter((book) => book.book._id !== bookId));
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">{shelf.replace("_", " ").toUpperCase()}</h2>
      <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
        {books.map((book) => (
          <Col key={book.book._id}>
            <BookCard book={book.book} /> {/* FIX: Passing correct data */}
            <Button
              variant="danger"
              className="mt-3"
              onClick={() => handleRemove(book.book._id)}
            >
              Remove
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserList;
