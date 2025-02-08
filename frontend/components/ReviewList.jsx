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
    <Row className='mt-4'>
      <Col xs={12}>
        <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-start align-items-md-center gap-3 gap-md-0 mb-4'>
          <h3 className='h2 mb-0'>All Reviews ({reviews.length})</h3>
          <CustomButton
            color='blue'
            onClick={() => setShowModal(true)}
            className='w-100 w-md-auto'
          >
            Write a Review
          </CustomButton>
        </div>

        <Row className='g-4'>
          {reviews.slice(0, visibleReviews).map((review) => (
            <Col xs={12} md={6} lg={4} key={review._id}>
              <Card
                className='h-100 rounded-5 shadow  '
                style={{
                  paddingTop: "10px",
                  paddingBottom: "2px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <Card.Body className='d-flex flex-column fs-5'>
                  <StarRating
                    className='mb-3'
                    maxRating={5}
                    size={24}
                    defaultRating={review.rating}
                    isReadOnly={true}
                  />
                  <Card.Title className='fs-5 fw-bold mb-0'>
                    {review.user} ✅
                  </Card.Title>
                  <hr />
                  <div className='text-black-50'>"{review.comment}"</div>

                  <small className='text-muted mt-2 text-light-emphasis fs-8'>
                    Posted on {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {visibleReviews < reviews.length && (
          <div className='text-center mt-5'>
            <CustomButton
              color='blue'
              onClick={() => setVisibleReviews((prev) => prev + 6)}
              className='px-5 py-2'
            >
              Load More Reviews
            </CustomButton>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ReviewList;
