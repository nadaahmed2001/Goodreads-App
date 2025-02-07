import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const BookCard = ({ book }) => {
  return (
    <Card className='h-100 shadow-sm book-card'>
      <Card.Img
        variant='top'
        src={book.coverImage}
        alt={book.title}
        className='card-img-top'
        style={{ height: "300px", objectFit: "cover" }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='card-title'>{book.title}</Card.Title>
        <Card.Text className='text-muted'>
          Author: {book.author?.name}
        </Card.Text>

        <div className='d-flex flex-wrap align-items-center gap-3 mb-4'>
          <StarRating
            className='mb-2 mb-md-0'
            maxRating={5}
            size={24}
            defaultRating={book.averageRating}
            isReadOnly={true}
          />

          <span className='fs-6 text-muted mt-1'>
            {Number(book.averageRating).toFixed(1)}/5
          </span>
        </div>

        <div className='d-grid'>
          <Link to={`/books/${book._id}`}>
            <Button variant='outline-primary' className='mt-2'>
              View Details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
