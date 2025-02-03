// components/BookCard.jsx
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ book, onAddToCart }) => {
  const hasDiscount = book.discountPrice && book.discountPrice !== book.price;
  const discountPercentage = hasDiscount
    ? Math.round(((book.discountPrice - book.price) / book.discountPrice) * 100)
    : 0;

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
        <Card.Subtitle className='text-muted mb-2'>
          By {book.author.name}
        </Card.Subtitle>

        <div className='mt-auto'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            {hasDiscount ? (
              <>
                <div>
                  <span className='text-danger h4'>${book.price}</span>
                  <del className='text-muted ms-2'>${book.discountPrice}</del>
                </div>
                <Badge bg='danger' className='fs-6'>
                  -{discountPercentage}%
                </Badge>
              </>
            ) : (
              <span className='h4 text-primary'>${book.price}</span>
            )}
          </div>

          <div className='d-flex justify-content-between mb-3'>
            <div className='text-warning'>
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className='bi bi-star-fill'></i>
              ))}
            </div>
          </div>

          <div className='d-grid gap-2'>
            <Button variant='primary' onClick={() => onAddToCart(book)}>
              Add to Cart
            </Button>
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
