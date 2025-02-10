import React, { useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import StarRating from "../components/StarRating";
import { AuthContext } from "../src/AuthContext";

const ReviewForm = ({
  showModal,
  setShowModal,
  newReview,
  setNewReview,
  handleAddReview,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rate and Review</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {!user && (
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your name'
                value={newReview.user}
                onChange={(e) =>
                  setNewReview({ ...newReview, user: e.target.value })
                }
              />
            </Form.Group>
          )}
          {user && (
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={user.first_name + " " + user.last_name}
                readOnly
              />
            </Form.Group>
          )}

          <Form.Group className='mb-3'>
            <Form.Label>Rating</Form.Label>
            <StarRating
              maxRating={5}
              size={30}
              onSetRating={(rating) => setNewReview({ ...newReview, rating })}
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
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => setShowModal(false)}
          style={{ background: "#828089", border: "#828089" }}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={handleAddReview}
          style={{ background: "#59461b", border: "#59461b" }}
        >
          Add Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewForm;
