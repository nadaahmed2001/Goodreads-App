import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { fetchBookById } from "../../servisces/api";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const data = await fetchBookById(bookId);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    getBook();
  }, [bookId]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>By {book.author}</p>
      <img src={book.coverImage} alt={book.title} width='200px' />
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      <p>Rating: {book.rating} ⭐</p>
    </div>
  );
};

export default BookDetails;
