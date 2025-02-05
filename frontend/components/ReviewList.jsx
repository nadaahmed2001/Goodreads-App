// ReviewList.jsx
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import StarRating from "../components/StarRating";
import CustomButton from "../components/CustomButton";

const ReviewList = ({
  reviews,
  visibleReviews,
  setVisibleReviews,
  setShowModal,
}) => {
  return (
    <Row>
      <div>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h3>All Reviews ({reviews.length})</h3>
          <CustomButton color='blue' onClick={() => setShowModal(true)}>
            Write a Review
          </CustomButton>
        </div>
        <Row className='mt-4 auto'>
          {reviews.slice(0, visibleReviews).map((review) => (
            <Col md={6} key={review._id} className='mb-4'>
              <Card className='rounded-4 w-auto p-3'>
                <Card.Body>
                  <StarRating
                    className='mb-4'
                    maxRating={5}
                    size={30}
                    defaultRating={review.rating}
                    isReadOnly={true}
                  />
                  <Card.Title>{review.user}</Card.Title>
                  <Card.Text>{review.comment}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {visibleReviews < reviews.length && (
          <div className='text-center mt-3'>
            <CustomButton
              color='blue'
              onClick={() => setVisibleReviews((prev) => prev + 6)}
            >
              Load More Reviews
            </CustomButton>
          </div>
        )}
      </div>
    </Row>
  );
};

export default ReviewList;
