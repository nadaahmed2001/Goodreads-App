import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import CustomButton from "./CustomButton";

const BookCard = ({ book }) => {
  return (
    <Card className='h-100 shadow-sm book-card rounded-5'>
      <Card.Img
        variant='top'
        src={book.coverImage}
        alt={book.title}
        className='img-fluid rounded-4 shadow rounded-bottom-0'
        style={{
          maxWidth: "100%",
          height: "auto",
          aspectRatio: "2/3",
          objectFit: "cover",
        }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='mb-2  '>{book.title}</Card.Title>
        <Card.Text className=' fs-8 mb-2 mt-0'>
          Author: {book.author?.name}
        </Card.Text>

        <div className='d-flex flex-wrap align-items-center gap-3 mb-2'>
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

        <div className=' text-center mt-2'>
          <Link to={`/books/${book._id}`}>
            <CustomButton variant='outline-primary'>Perview</CustomButton>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
