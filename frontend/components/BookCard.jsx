// components/BookCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Card className='h-100 shadow-sm'>
      <Card.Img
        variant='top'
        src={book.coverImage}
        alt={book.title}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='mb-3'>{book.title}</Card.Title>
        {/* <Card.Subtitle className='text-muted mb-2'>
          By {book.author.name}
        </Card.Subtitle> */}

        <div className='mt-auto'>
          <div className='d-flex justify-content-between mb-3'>
            <div className='text-warning'>
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className='bi bi-star-fill'></i>
              ))}
            </div>
          </div>

          <div className='d-grid gap-2'>
            <Button
              variant='outline-primary'
              as={Link}
              to={`/books/${book._id}`}
            >
              View Details
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
