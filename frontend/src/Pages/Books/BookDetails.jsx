import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById, addBookToList } from "../../services/api"; // Add the API function
// import { fetchBookById } from "../../servisces/api";
import { fetchBookById } from "../../services/api";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Stack,
  Card,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import CustomButton from "../../../components/CustomButton";
import { v4 as uuidv4 } from "uuid";
import { FaHeart } from "react-icons/fa";
import StarRating from "../../../components/StarRating";

const BookDetails = () => {
  const dummyReviews = [
    { _id: "1", user: "fatma", rating: 5, comment: "great book" },
    { _id: "2", user: "nada", rating: 4, comment: "very nice" },
    { _id: "3", user: "rahma", rating: 3, comment: "not good and not bad" },
    { _id: "4", user: "abdelrahman", rating: 1, comment: "not good" },
    { _id: "5", user: "hosam", rating: 0, comment: "very bad" },
  ];

  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(dummyReviews);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: "",
    comment: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if user is authenticated

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetchBookById(bookId);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error.response || error);
      }
    };
    getBook();

    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [bookId]);

  const handleAddToList = async (shelf) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add books to your list.");
        return;
      }

      const response = await addBookToList(bookId, shelf, token);
      if (response.data.success) {
        alert(`Book moved to ${shelf.replace("_", " ")} list!`);
      }
    } catch (error) {
      console.error("Error adding book to list:", error.response || error);
      alert("Failed to add book to list.");
    }
  };


  if (!book)
    return <p className='text-center mt-4 fs-5 fw-semibold'>Loading...</p>;

  const handleAddReview = () => {
    if (!newReview.user || !newReview.rating || !newReview.comment) return;

    const updatedReviews = [...reviews, { ...newReview, _id: uuidv4() }];
    setReviews(updatedReviews);

    setBook((prevBook) => ({
      ...prevBook,
      rating: calculateAverageRating(updatedReviews),
    }));

    setShowModal(false);
    setNewReview({ user: "", rating: "", comment: "" });
  };

  return (
    <Container className='my-5 max-w-5xl'>
      <Row className='g-4 bg-white shadow-lg rounded-3 p-4'>
        <Col
          md={4}
          className='d-flex justify-content-center align-items-center'
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className='img-fluid rounded-3 shadow'
            style={{ maxWidth: "250px" }}
          />
        </Col>
        <Col md={8}>
          <h1 className='display-4 fw-bold mb-3'>{book.title}</h1>
          {/* category */}
          <h4 className="lead text-muted mb-4">Category: {book.category.name}</h4>
          <p className='lead text-muted mb-4'>By: {book.author.name}</p>
          <Badge bg='warning' className='fs-5 me-2'>
            ⭐ {book.rating}/5
          </Badge>
          <p className='text-secondary fs-5 mb-4'>{book.description}</p>

          <Stack direction='horizontal' className='mt-4' gap={2}>
            {isAuthenticated && (
              <Dropdown>
                <Dropdown.Toggle variant='primary' id='dropdown-add-to-list'>
                  Add to List
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleAddToList("read")}>
                    Read
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleAddToList("currently_reading")}
                  >
                    Currently Reading
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleAddToList("want_to_read")}>
                    Want to Read
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <CustomButton color='blue' icon={<FaHeart />}>
              Add to Wishlist
            </CustomButton>
          </Stack>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row>
        <div className='mt-5'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h3>All Reviews ({reviews.length})</h3>
            <CustomButton color='blue' onClick={() => setShowModal(true)}>
              Write a Review
            </CustomButton>
          </div>
          <Row>
            {reviews.slice(0, visibleReviews).map((review) => (
              <Col md={6} key={review._id} className='mb-4'>
                <Card>
                  <Card.Body>
                    <Card.Title>⭐ {review.rating}</Card.Title>
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

      {/* Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
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
    </Container>
  );
};

export default BookDetails;