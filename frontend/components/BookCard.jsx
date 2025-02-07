// components/BookCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";


const BookCard = ({ book }) => {

  // const { bookId } = useParams();
  // const [reviews, setReviews] = useState([]);
  // const [loadingReviews, setLoadingReviews] = useState(true);

  // useEffect(() => {
  //   // const getBook = async () => {
  //   //   try {
  //   //     const response = await fetchBookById(bookId);
  //   //     setBook(response.data);
  //   //   } catch (error) {
  //   //     console.error("Error fetching book details:", error.response || error);
  //   //   }
  //   // };
  //   // getBook();

  //   const fetchReviews = async () => {
  //     try {
  //       const response = await fetchBookReviews(bookId);
  //       setReviews(response.data);
  //       setLoadingReviews(false);
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //       setLoadingReviews(false);
  //     }
  //   };
  //   if (bookId) {
  //     fetchReviews();
  //   }
  // }, [bookId]);

  const bookData = book.book || book; // Handle both nested and non-nested book objects


  return (
    <Card className='h-100 shadow-sm book-card'>
      <Card.Img
        variant='top'
        src={bookData.coverImage}
        alt={bookData.title}
        className='card-img-top'
        style={{ height: "300px", objectFit: "cover" }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='card-title'>{bookData.title}</Card.Title>
        <Card.Text className='text-muted'>
          Author: {bookData.author ? bookData.author.name : "Unknown"}
        </Card.Text>



        <div className='d-flex justify-content-between mt-2'>
          <StarRating
            className='mb-4'
            maxRating={5}
            size={30}
            defaultRating={bookData.rating}
            isReadOnly={true}
          >
            {bookData.rating}/5
          </StarRating>
        </div>


        <div className='d-grid'>
          <Link to={`/books/${bookData._id}`}>
            <Button variant='outline-primary' className='mt-2'>

              View Details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
