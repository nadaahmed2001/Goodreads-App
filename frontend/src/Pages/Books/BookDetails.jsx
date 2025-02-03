import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../../services/api";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Stack,
  Card,
} from "react-bootstrap";
import CustomButton from "../../../components/CustomButton";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const BookDetails = () => {
  const dummyReviews = [
    { _id: "1", user: "fatma", rating: 5, comment: "great book  " },
    { _id: "2", user: "nada", rating: 4, comment: "very nice" },
    { _id: "3", user: "rahma", rating: 3, comment: "not good and not bad" },
    { _id: "4", user: "abdelrahman", rating: 1, comment: "not good" },
    { _id: "5", user: "hosam", rating: 0, comment: "very bad" },
  ];

  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(dummyReviews);
  const [visibleReviews, setVisibleReviews] = useState(4);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetchBookById(bookId);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error.response || error);
      }
    };
    // axios
    //   .get(`/api/books/${bookId}/reviews`)
    //   .then((response) => setReviews(response.data))
    //   .catch(() => setError("Failed to fetch reviews"));

    getBook();
  }, [bookId]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!book)
    return <p className='text-center mt-4 fs-5 fw-semibold'>Loading...</p>;

  const discountPercentage = Math.round(
    ((book.discountPrice - book.price) / book.discountPrice) * 100
  );

  return (
    <Container className='my-5 max-w-5xl'>
      {/* book detailes */}
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
          <p className='lead text-muted mb-4'>By {book.author.name}</p>

          <div className='d-flex align-items-center mb-4'>
            <Badge bg='warning' className='fs-5 me-2'>
              ⭐ {book.rating}/5
            </Badge>
          </div>

          <div className='d-flex align-items-center gap-3 mb-4'>
            {book.discountPrice ? (
              <>
                <span className='display-6 fw-bold text-danger'>
                  ${book.price}
                </span>
                <span className='fs-5 text-muted text-decoration-line-through'>
                  ${book.discountPrice}
                </span>
                <Badge bg='danger' className='fs-5'>
                  -{discountPercentage}%
                </Badge>
              </>
            ) : (
              <span className='display-6 fw-bold'>${book.price}</span>
            )}
          </div>

          <p className='text-secondary fs-5 mb-4'>{book.description}</p>

          <div className='d-flex align-items-center mb-4'>
            <div className='border rounded-3 bg-light'>
              <Button
                variant='outline-secondary'
                onClick={decreaseQuantity}
                className='px-3 py-2'
              >
                −
              </Button>
              <span className='px-4 fs-4 fw-semibold'>{quantity}</span>
              <Button
                variant='outline-secondary'
                onClick={increaseQuantity}
                className='px-3 py-2'
              >
                +
              </Button>
            </div>
          </div>

          <Stack direction='horizontal' gap={3} className='mt-4'>
            <CustomButton color='gray' icon={<FaHeart />}>
              Add to Wishlist
            </CustomButton>
            <CustomButton color='blue' icon={<FaShoppingCart />}>
              Add to Cart
            </CustomButton>{" "}
          </Stack>
        </Col>
      </Row>

      {/* reviews */}
      <Row>
        <div className='mt-5'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h3>All Reviews ({reviews.length})</h3>

            <CustomButton
              color='blue'
              onClick={() => console.log("Write Review Clicked")}
            >
              Write a Review
            </CustomButton>
          </div>

          <Row>
            {Array.isArray(reviews) &&
              reviews.slice(0, visibleReviews).map((review) => (
                <Col md={6} key={review._id} className='mb-4'>
                  <Card>
                    <Card.Body>
                      <Card.Title>⭐ {review.rating}</Card.Title>
                      <Card.Title>{review.user}</Card.Title>
                      <Card.Text>{review.comment}</Card.Text>
                      <small className='text-muted'>
                        {new Date().toLocaleDateString()}
                      </small>
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
    </Container>
  );
};

export default BookDetails;
////////////////////////////////////////////////////////////////////////////////
