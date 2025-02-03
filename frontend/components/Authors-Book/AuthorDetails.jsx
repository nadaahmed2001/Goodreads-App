
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Authors-Book.css';

export default function AuthorDetails() {
  const { authorId } = useParams(); // This gets the authorId from the URL
  const [author, setAuthor] = useState(null);
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
        
        // If you receive an array, take the first element
        setAuthor(data[0] || data);  // If data is an array, select the first element
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
    <section className="cards">
      <div className="card">
        <h3>{author.name}</h3>
        <h4>{author.data}</h4> {/* Make sure this field exists or replace with the correct one */}
        <img src={author.image} alt={author.name} />
        <p>{author.bio}</p>
      </div>
    </section>
  );
}
