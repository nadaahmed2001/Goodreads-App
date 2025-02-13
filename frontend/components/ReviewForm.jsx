import React, { useContext } from "react";
import styled from "styled-components";
import StarRating from "../components/StarRating";
import { AuthContext } from "../src/AuthContext";
import CustomButton from "./CustomButton";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContainer = styled.div`
  background-color: var(--bg-white) !important;
  color: var(--text-brown, #59461b);
  box-shadow:
    0 2px 6px rgb(255 255 255 / 45%),
    0 8px 24px rgb(255 255 255 / 24%);
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  background-color: var(--bg-brown) !important;
  color: var(--text-beige, #fff7e7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid var(--border-botom);
  box-shadow:
    0 1px 2px rgb(255 255 255 / 45%),
    0 2px 15px rgb(255 255 255 / 24%);
`;

const ModalBody = styled.div`
  padding: 1rem;
`;

const ModalFooter = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background-color: var(--bg-white) !important;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-brown, #59461b);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: var(--text-brown, #59461b);
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: var(--bg-brown);
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  color: var(--text-beige, #fff7e7);
  background-color: ${({ variant }) =>
    variant === "primary" ? "#59461b" : "#828089"};
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "primary" ? "#3e3717" : "#6e6564"};
  }
`;

const ReviewForm = ({
  showModal,
  setShowModal,
  newReview,
  setNewReview,
  handleAddReview,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ModalOverlay show={showModal}>
      <ModalContainer>
        <ModalHeader>
          <span>Rate and Review</span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            ✖
          </span>
        </ModalHeader>
        <ModalBody>
          {!user && (
            <FormGroup>
              <Label>Name</Label>
              <Input
                type='text'
                placeholder='Enter your name'
                value={newReview.user}
                onChange={(e) =>
                  setNewReview({ ...newReview, user: e.target.value })
                }
              />
            </FormGroup>
          )}
          <FormGroup>
            <Label>Rating</Label>
            <StarRating
              maxRating={5}
              size={30}
              onSetRating={(rating) => setNewReview({ ...newReview, rating })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Review</Label>
            <TextArea
              rows='3'
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <CustomButton variant='secondary' onClick={() => setShowModal(false)}>
            Cancel
          </CustomButton>

          <CustomButton variant='primary' onClick={handleAddReview}>
            Add Review
          </CustomButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ReviewForm;
