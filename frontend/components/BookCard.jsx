import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import CustomButton from "./CustomButton";
import { Tilt } from "react-tilt";

const CardContainer = styled.div`
  position: relative;
  height: 480px;
  background-color: var(--bg-white);
  // border: 1px solid var(--border-no) !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 1px 4px rgb(255 255 255 / 45%),
    0 6px 20px rgb(255 255 255 / 24%);
  transition: all 0.3s ease;
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const CardTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: var(--text-brown);
`;

const CardText = styled.p`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-muted, #666);
`;

const RatingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const RatingText = styled.span`
  font-size: 1rem;
  color: var(--text-muted, #555);
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
`;

const BookCard = ({ book }) => {
  return (
    <Tilt options={{ scale: 1.05, glare: false }}>
      <CardContainer>
        <CardImage src={book.coverImage} alt={book.title} />
        <CardBody>
          <CardTitle>{book.title}</CardTitle>
          <CardText>Author: {book.author?.name}</CardText>
          <RatingContainer>
            <StarRating
              maxRating={5}
              size={24}
              defaultRating={book.averageRating}
              isReadOnly={true}
            />
            <RatingText>{Number(book.averageRating).toFixed(1)}/5</RatingText>
          </RatingContainer>
        </CardBody>

        <ButtonContainer>
          <Link to={`/books/${book._id}`}>
            <CustomButton variant='outline-primary'>Perview</CustomButton>
          </Link>
        </ButtonContainer>
      </CardContainer>
    </Tilt>
  );
};

export default BookCard;
