import React, { useEffect, useState } from 'react';
import './Authors-Book.css';
import Author from './Author';
import Navbar from '../navbar';

export default function AuthorsBook() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const apiUrl = 'http://localhost:5000/authors';

    const fetchAuthors = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <Author authors={authors} /> {/* Pass authors array as props */}


    </>
  );
}
