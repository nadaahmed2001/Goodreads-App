import React, { useContext } from 'react';
import { AuthContext } from '../../src/AuthContext';
import './Authors-Book.css';
import Author from './Author';
import Navbar from '../navbar';

export default function AuthorsBook() {
  const { authors, authorsLoading, authorsError } = useContext(AuthContext);

  if (authorsLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading authors...</p>
      </div>
    );
  }

  if (authorsError) {
    return <div>Error: {authorsError}</div>;
  }

  return (
    <>
      <Navbar />
      <Author authors={authors} /> {/* Pass authors array as props */}
    </>
  );
}
