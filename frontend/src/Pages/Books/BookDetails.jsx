import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../../services/api";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetchBookById(bookId);
        console.log("Fetched Book Response:", response); // ✅ Log response
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error.response || error);
      }
    };
    

    getBook();
  }, [bookId]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>By {book.author.name}</p>
      <p>Category: {book.category.name}</p>
      <img src={book.coverImage} alt={book.title} width='200px' />
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      <p>Rating: {book.rating} ⭐⭐⭐⭐</p>
    </div>
  );
};

export default BookDetails;
