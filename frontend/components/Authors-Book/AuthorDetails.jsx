import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import './Authors-Book.css';

export default function AuthorDetails() {
  const { authorId } = useParams(); // This gets the authorId from the URL
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);  // Separate state for books
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:5000/authors/${authorId}`;

    const fetchAuthor = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch author data');
        }
        const data = await response.json();

        // Since the data is an array, we can get the first book's author details and all the books
        if (data.length > 0) {
          setAuthor(data[0].author);  // Assuming author details are in the first book
          setBooks(data);  // Store all books written by the author
        } else {
          setError('No data found for this author');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);  // Re-fetch when authorId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!author) {
    return <div>Author not found.</div>;
  }

  return (
    <>
      <Navbar />
      {/* Section to display author details */}
      <section className="cards">
        <div className="card">
          <h3>{author.name}</h3>
          <h4>{author.bio}</h4> {/* Display bio or any other relevant field */}
          <img src={author.image} alt={author.name} />
          <p>{author.bio}</p>
        </div>
      </section>

      {/* Section to display books by the author */}
      <section className="books">
        <h2>Books by {author.name}</h2>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <img src={book.coverImage} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available for this author.</p>
        )}
      </section>
    </>
  );
}
