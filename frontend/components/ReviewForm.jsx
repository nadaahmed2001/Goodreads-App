// ReviewForm.jsx
import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import StarRating from "../components/StarRating";
import CustomButton from "../components/CustomButton";

const ReviewForm = ({
  showModal,
  setShowModal,
  newReview,
  setNewReview,
  handleAddReview,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rate and Review</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={newReview.user}
              onChange={(e) =>
                setNewReview({ ...newReview, user: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type='number'
              min='0'
              max='5'
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <StarRating
              maxRating={5}
              size={30}
              onSetRating={(rating) => setNewReview({ ...newReview, rating })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleAddReview}>
          Add Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewForm;
