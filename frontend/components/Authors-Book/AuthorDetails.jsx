import { useEffect, useState } from 'react';
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
      <section className="author-details">
        <div className="author-details-card">
         <div className='img'>
          <img src={author.image} alt={author.name} />
          </div>
          <div className='container2'>
          <h3>{author.name}</h3>
          <h4>{author.birthDate}</h4>
          <p>{author.bio}</p>
          </div>
        </div>
      </section>

      {/* Section to display books by the author */}
       <section className="books">
        <h2 className='bookname'>Books by {author.name}</h2>
        {books.length > 0 ? (
           <ul >
            {books.map((book) => (
              <li key={book._id}>
                <img className="bookimg"src={book.coverImage} alt={book.title} />
               <h3 className='booktitle'>{book.title}</h3>
              <p className='bookdes'>{book.description}</p>
              <p className="bookcategory">Category: {book.category?.name}</p>
              <p className="bookrating">Rating: {book.rating}</p>
              <p className="bookfeatured">{book.featured ? 'Featured' : 'Not Featured'}</p>
              <p className="booktrending">{book.trending ? 'Trending' : 'Not Trending'}</p>
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
