// components/BookCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const BookCard = ({ book }) => {
  const bookData = book.book || book; // Handle both nested and non-nested book objects

  return (
    <Card className="h-100 shadow-sm book-card">
      <Card.Img
        variant="top"
        src={bookData.coverImage}
        alt={bookData.title}
        className="card-img-top"
        style={{ height: "300px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="card-title">{bookData.title}</Card.Title>
        <Card.Text className="text-muted">Author: {bookData.author?.name}</Card.Text>

        <div className="d-flex justify-content-between mt-2">
          <span className="text-muted">⭐⭐⭐⭐⭐</span>
        </div>

        <div className="d-grid">
          <Link to={`/books/${bookData._id}`}>
            <Button variant="outline-primary" className="mt-2">
              View Details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
