import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../../services/api";
import { Container, Row, Col, Button, Badge, Stack } from "react-bootstrap";
import CustomButton from "../../../components/CustomButton";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
    </Container>
  );
};

export default BookDetails;
