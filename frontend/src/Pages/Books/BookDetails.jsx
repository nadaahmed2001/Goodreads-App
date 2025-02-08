import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import {
  fetchBookById,
  fetchBookReviews,
  addBookToList,
  submitReview,
} from "../../services/api";

import { Container, Row, Col, Stack, Dropdown } from "react-bootstrap";
import StarRating from "../../../components/StarRating";
import Navbar from "./../../../components/navbar";
import ReviewForm from "../../../components/ReviewForm";
import ReviewList from "../../../components/ReviewList";
import FooterPage from "../Footer/FooterPage";
import DemoSection from "../../../components/DemoSection";
import { AuthContext } from "../../AuthContext";

const BookDetails = () => {
  // Check if the user is authenticated
  const { user, role, subscription } = useContext(AuthContext);
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [loadingReviews, setLoadingReviews] = useState(true);
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: "",
    comment: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if user is authenticated

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

    const fetchReviews = async () => {
      try {
        const response = await fetchBookReviews(bookId);
        setReviews(response.data);
        setLoadingReviews(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();

    if (token) {
      setIsAuthenticated(true);
    }
  }, [bookId, token]);

  const handleAddReview = async () => {
    if (!newReview.user || !newReview.rating || !newReview.comment) return;

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const formattedReview = {
        ...newReview,
        rating: Number(newReview.rating),
      };

      const response = await submitReview(bookId, formattedReview, token);
      setReviews((prev) => [...prev, response.data]);
      setShowModal(false);
      setNewReview({ user: "", rating: "", comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };

  const handleAddToList = async (shelf) => {
    try {
      if (!token) {
        alert("Please log in to add books to your list.");
        return;
      }

      const response = await addBookToList(bookId, shelf, token);
      if (response.data.success) {
        alert(`Book moved to ${shelf.replace("_", " ")} list!`);
      }
    } catch (error) {
      console.error("Error adding book to list:", error);
      alert(error.response?.data?.message || "Failed to add book to list.");
    }
  };

  if (!reviews)
    return <p className='text-center mt-4 fs-5 fw-semibold'>Loading...</p>;

  if (!book)
    return (
      <p className='text-center mt-4 fs-5 fw-semibold'>{loadingReviews}</p>
    );

  return (
    <>
      <Navbar />
      <Container fluid='lg' className='my-5'>
        <Row className='g-4 p-3'>
          <Col xs={12} md={6} lg={4} className='d-flex justify-content-center'>
            <img
              src={book.coverImage}
              alt={book.title}
              className='img-fluid rounded-4 shadow'
              style={{
                width: "250px",
                maxWidth: "100%",
                height: "auto",
                aspectRatio: "2/3",
                objectFit: "cover",
              }}
            />
          </Col>

          <Col xs={12} md={6} lg={8}>
            <div className='ps-lg-4'>
              <h1 className='display-5 display-md-4 fw-bold mb-3'>
                {book.title}
              </h1>

              <div className='d-flex flex-wrap align-items-center gap-3 mb-4'>
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

              <div className='mb-4'>
                <h4 className='h5 text-muted mb-2'>
                  Category: {book.category.name}
                </h4>
                <h4 className='h5 text-muted'>By: {book.author?.name}</h4>
              </div>

              <hr className='my-4' />

              <p className='lead text-secondary mb-4'>
                {book.description || `Lorem ipsum...`}
              </p>

              <Stack direction='horizontal' className='flex-wrap gap-3 mt-4'>
                {isAuthenticated && (
                  <>
                    <Dropdown className='me-2'>
                      <Dropdown.Toggle
                        variant='primary'
                        className='text-nowrap'
                        id='dropdown-add-to-list'
                      >
                        Add to List
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='w-100'>
                        <Dropdown.Item onClick={() => handleAddToList("read")}>
                          Read
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleAddToList("currently_reading")}
                        >
                          Currently Reading
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleAddToList("want_to_read")}
                        >
                          Want to Read
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    {/* {
                      (subscription === 'Active' && role === "user") &&
                      <Button className="bg-success" onClick={() => navigate(`/BookPreview/${book._id}`)}>Read Full Book</Button>
                    } */}
                  </>
                )}
              </Stack>
            </div>
          </Col>
        </Row>

        <hr className='my-5' />
        <Row className='g-2 p-1'>
          {isAuthenticated && (
            <DemoSection demoText={book.demo} bookId={book._id} token={token} />
          )}

          <Col
            xs={12}
            md={12}
            lg={12}
            className='d-flex justify-content-center'
          ></Col>
        </Row>
        <hr className='my-5' />

        <Row>
          <Col xs={12}>
            <ReviewList
              reviews={reviews}
              visibleReviews={visibleReviews}
              setVisibleReviews={setVisibleReviews}
              setShowModal={setShowModal}
            />
          </Col>
        </Row>

        <ReviewForm
          showModal={showModal}
          setShowModal={setShowModal}
          newReview={newReview}
          setNewReview={setNewReview}
          handleAddReview={handleAddReview}
        />
      </Container>
      <FooterPage />
    </>
  );
};

export default BookDetails;
