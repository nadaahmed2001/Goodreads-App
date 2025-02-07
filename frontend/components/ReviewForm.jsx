// // ReviewForm.jsx
// import React from "react";
// import { Button, Modal, Form } from "react-bootstrap";
// import StarRating from "../components/StarRating";
// import CustomButton from "../components/CustomButton";

// const ReviewForm = ({
//   showModal,
//   setShowModal,
//   newReview,
//   setNewReview,
//   handleAddReview,
// }) => {
//   return (
//     <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Rate and Review</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form>
//           <Form.Group className='mb-3'>
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type='text'
//               value={newReview.user}
//               onChange={(e) =>
//                 setNewReview({ ...newReview, user: e.target.value })
//               }
//             />
//           </Form.Group>

//           <Form.Group className='mb-3'>
//             <Form.Label>Rating</Form.Label>
//             <Form.Control
//               type='number'
//               min='0'
//               max='5'
//               value={newReview.rating}
//               onChange={(e) =>
//                 setNewReview({ ...newReview, rating: e.target.value })
//               }
//             />
//           </Form.Group>

//           <Form.Group className='mb-3'>
//             <Form.Label>Comment</Form.Label>
//             <Form.Control
//               as='textarea'
//               rows={3}
//               value={newReview.comment}
//               onChange={(e) =>
//                 setNewReview({ ...newReview, comment: e.target.value })
//               }
//             />
//           </Form.Group>

//           <Form.Group className='mb-3'>
//             <StarRating
//               maxRating={5}
//               size={30}
//               onSetRating={(rating) => setNewReview({ ...newReview, rating })}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant='secondary' onClick={() => setShowModal(false)}>
//           Cancel
//         </Button>
//         <Button variant='primary' onClick={handleAddReview}>
//           Add Review
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ReviewForm;
//c-1////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReviewForm.jsx
// import React from "react";
// import { Button, Modal, Form } from "react-bootstrap";
// import StarRating from "../components/StarRating";
// const ReviewForm = ({
//   showModal,
//   setShowModal,
//   newReview,
//   setNewReview,
//   handleAddReview,
// }) => {
//   return (
//     <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Rate and Review</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form>
//           <Form.Group className='mb-3'>
//             <Form.Label>Rating</Form.Label>
//             <StarRating
//               maxRating={5}
//               size={30}
//               onSetRating={(rating) => setNewReview({ ...newReview, rating })}
//             />
//           </Form.Group>

//           <Form.Group className='mb-3'>
//             <Form.Label>Comment</Form.Label>
//             <Form.Control
//               as='textarea'
//               rows={3}
//               value={newReview.comment}
//               onChange={(e) =>
//                 setNewReview({ ...newReview, comment: e.target.value })
//               }
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button
//           variant='secondary'
//           onClick={() => setShowModal(false)}
//           style={{ background: "#828089", border: "#828089" }}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant='primary'
//           onClick={handleAddReview}
//           style={{ background: "#088178", border: "#088178" }}
//         >
//           Add Review
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ReviewForm;

//c-2////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import axios from "axios";

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:5000/api/books/${bookId}/reviews`,
        newReview,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onReviewAdded(response.data);
      setNewReview({ user: "", rating: 0, comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Your Name'
        value={newReview.user}
        onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
      />
      <input
        type='number'
        min='1'
        max='5'
        placeholder='Rating (1-5)'
        value={newReview.rating}
        onChange={(e) =>
          setNewReview({ ...newReview, rating: Number(e.target.value) })
        }
      />
      <textarea
        placeholder='Your Comment'
        value={newReview.comment}
        onChange={(e) =>
          setNewReview({ ...newReview, comment: e.target.value })
        }
      />
      <button type='submit'>Submit Review</button>
    </form>
  );
};

export default ReviewForm;
