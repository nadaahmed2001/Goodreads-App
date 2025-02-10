import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import './Authors-Book.css';
import BookCard from '../BookCard';
import FooterPage from '../../src/Pages/Footer/FooterPage';

export default function AuthorDetails({ }) {
  const { authorId } = useParams(); 
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  
  useEffect(() => {
    const apiUrl = `https://goodreads-app-production.up.railway.app/authors/${authorId}`;

    const fetchAuthor = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch author data');
        }
        const data = await response.json();

        console.log(data);
      
        if (Array.isArray(data.books)) {
          setAuthor(data.author);  
          setBooks(data.books);  
        } else {
          setAuthor(data.author); 
          setBooks([])
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);  

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
    <Navbar/>
      {/* Section to display author details */}
      
        <div className="author-details-card">
         <div className='img'>
          <img src={author.image} alt={author.name} />
          </div>
          <div className='container2'>
          <h3>{author.name}</h3>
          <h4>{author.birthDate}</h4>
          <p>{author.bio}</p>
          <hr></hr>
          </div>
        </div>
     

      {/* Section to display books by the author */}
     
       <section className='authors-books-publish'>
      <h2 className='bookname'><span >Books by : </span>{author.name}</h2>
      <hr></hr>
       <section className="books">
            
        {books.length > 0 ? (
           <ul >
            {books.map((book) => (
            <div className="BookCard-style">
            <BookCard  book={book} />
          </div>
        ))}
        
          </ul>
          
         ) : (
           <p>No books available for this author.</p>
      )}
     </section> 
     </section>
   <FooterPage />
    </>
  );
}
