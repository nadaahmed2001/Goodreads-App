import { useState, useEffect } from "react";
import { fetchBooks } from "../../services/api";

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <a href={`/books/${book._id}`}>{book.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
