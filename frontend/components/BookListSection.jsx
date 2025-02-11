import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchBooks } from "../src/services/api";
import BookCard from "./BookCard";

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--text-brown, #59461b);

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const MessageContainer = styled.div`
  text-align: center;
  margin: 50px 0;
  font-size: 1.2rem;
  color: var(--text-brown, #59461b);
`;

const BookListSection = ({ title }) => {
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

  if (loading) {
    return (
      <SectionContainer>
        <MessageContainer>Loading...</MessageContainer>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <Title>{title}</Title>
      {books.length === 0 ? (
        <MessageContainer>
          No books found. Check back later for new additions!
        </MessageContainer>
      ) : (
        <BooksGrid>
          {books.map((book) => (
            <div key={book._id}>
              <BookCard book={book} />
            </div>
          ))}
        </BooksGrid>
      )}
    </SectionContainer>
  );
};

export default BookListSection;
