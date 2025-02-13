import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import StartCanvas from "../../../components/canvas/Stars";
import styled from "styled-components";

const PageContainer = styled.div`
  position: relative;
  z-index: 1000;
  background-color: var(--bg-beige) !important;
  color: var(--text-brown) !important;
`;
const MainContent = styled.div`
  max-width: 1200px;
  margin: 0px auto;
  padding: 50px;
  color: var(--text-brown) !important;
`;

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 1rem;
`;

const FlexCol = styled.div`
  flex: ${({ flexBasis }) => flexBasis || "1"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ align }) => align || "flex-start"};
`;

const ImageStyled = styled.img`
  width: 250px;
  max-width: 100%;
  height: auto;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 10px;
`;

const DetailsContainer = styled.div`
  padding-left: 1rem;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--text-brown) !important;
`;

const SubText = styled.h4`
  font-size: 1rem;
  color: var(--text-brown) !important;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Divider = styled.hr`
  margin: 2rem 0;
  border: none;
  border-top: 1px solid var(--text-brown);
`;

const ActionsContainer = styled.div`
  background-color: var(--bg-beige) !important;
  color: var(--text-brown) !important;
`;

const BookDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  let token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: "",
    comment: "",
  });

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
  }, [bookId]);

  const handleAddReview = async () => {
    if (!newReview.rating || !newReview.comment) return;

    const reviewData = {
      ...newReview,
      user: user ? `${user.first_name} ${user.last_name}` : newReview.user,
      rating: Number(newReview.rating),
    };
    try {
      const response = await submitReview(bookId, reviewData, token);
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

  const computedAverageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  if (!reviews)
    return <p className='text-center mt-4 fs-5 fw-semibold'>Loading...</p>;
  if (!book)
    return (
      <p className='text-center mt-4 fs-5 fw-semibold'>{loadingReviews}</p>
    );

  return (
    <>
      <Navbar />
      <PageContainer>
        <StartCanvas />
        <MainContent fluid='lg'>
          <FlexRow className='g-4 p-3'>
            <FlexCol flexBasis='auto' align='center'>
              <ImageStyled src={book.coverImage} alt={book.title} />
            </FlexCol>
            <FlexCol flexBasis='2'>
              <Title>{book.title}</Title>
              <FlexRow
                style={{
                  alignItems: "center",
                  gap: "0.5rem",
                  paddingLeft: "0px",
                }}
              >
                <StarRating
                  maxRating={5}
                  size={24}
                  defaultRating={computedAverageRating}
                  isReadOnly={true}
                />
                <span
                  style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                >
                  {Number(computedAverageRating).toFixed(1)}/5
                </span>
              </FlexRow>
              <SubText>Category: {book.category.name}</SubText>
              <SubText>By: {book.author?.name}</SubText>
              <Divider />
              <Description>{book.description || "Lorem ipsum..."}</Description>
              <Stack direction='horizontal' className='flex-wrap gap-3 mt-4'>
                {user && (
                  <>
                    <Dropdown className='me-2'>
                      <Dropdown.Toggle
                        variant='primary'
                        className='text-nowrap rounded-5 bg-main bg-main-hover bg-main-focus'
                        id='dropdown-add-to-list'
                      >
                        Add to List
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='w-150 rounded-3'>
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
                  </>
                )}
              </Stack>
            </FlexCol>
          </FlexRow>

          {user && (
            <>
              <Divider />
              <Title style={{ textAlign: "center" }}>Demo</Title>
              <DemoSection
                demoText={book.demo}
                bookId={book._id}
                token={token}
              />
            </>
          )}

          <Divider />

          <FlexRow>
            <Col xs={12}>
              <ReviewList
                reviews={reviews}
                visibleReviews={visibleReviews}
                setVisibleReviews={setVisibleReviews}
                setShowModal={setShowModal}
              />
            </Col>
          </FlexRow>

          <ReviewForm
            showModal={showModal}
            setShowModal={setShowModal}
            newReview={newReview}
            setNewReview={setNewReview}
            handleAddReview={handleAddReview}
          />
        </MainContent>
      </PageContainer>
      <FooterPage />
    </>
  );
};

export default BookDetails;
