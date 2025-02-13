// import { useContext } from "react";
// import { Row, Col, Card } from "react-bootstrap";
// import StarRating from "../components/StarRating";
// import CustomButton from "../components/CustomButton";
// import { AuthContext } from "../src/AuthContext";

// const ReviewList = ({
//   reviews,
//   visibleReviews,
//   setVisibleReviews,
//   setShowModal,
// }) => {
//   const { user } = useContext(AuthContext);
//   return (
//     <Row className='mt-4'>
//       <Col xs={12}>
//         <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-start align-items-md-center gap-3 gap-md-0 mb-4'>
//           <h3 className='h2 mb-0 c-main'>All Reviews ({reviews.length})</h3>

//           {user ? (
//             <CustomButton
//               color='blue'
//               onClick={() => setShowModal(true)}
//               className='w-100 w-md-auto'
//             >
//               Write a Review
//             </CustomButton>
//           ) : null}
//         </div>

//         <Row className='g-4'>
//           {reviews.slice(0, visibleReviews).map((review) => (
//             <Col xs={12} md={6} lg={4} key={review._id}>
//               <Card
//                 className='h-100 rounded-5 shadow  '
//                 style={{
//                   paddingTop: "10px",
//                   paddingBottom: "2px",
//                   paddingLeft: "10px",
//                   paddingRight: "10px",
//                 }}
//               >
//                 <Card.Body className='d-flex flex-column fs-5'>
//                   <StarRating
//                     className='mb-3'
//                     maxRating={5}
//                     size={24}
//                     defaultRating={review.rating}
//                     isReadOnly={true}
//                   />
//                   <Card.Title className='fs-5 fw-bold mb-0'>
//                     {review.user} ✅
//                   </Card.Title>
//                   <hr />
//                   <div className='text-black-50'>"{review.comment}"</div>

//                   <small className='text-muted mt-2 text-light-emphasis fs-8'>
//                     Posted on {new Date(review.createdAt).toLocaleDateString()}
//                   </small>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         {visibleReviews < reviews.length && (
//           <div className='text-center mt-5'>
//             <CustomButton
//               color='blue'
//               onClick={() => setVisibleReviews((prev) => prev + 6)}
//               className='px-5 py-2'
//             >
//               Load More Reviews
//             </CustomButton>
//           </div>
//         )}
//       </Col>
//     </Row>
//   );
// };

// export default ReviewList;
import React, { useContext } from "react";
import styled from "styled-components";
import StarRating from "../components/StarRating";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../src/AuthContext";

const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  margin: 0;
  color: var(--text-brown, #59461b);
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const CardContainer = styled.div`
  height: 100%;
  background-color: var(--bg-white);
  border-radius: 10px;
  box-shadow:
    0 2px 6px rgb(255 255 255 / 45%),
    0 8px 24px rgb(255 255 255 / 24%);
  transition: all 0.3s ease;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: var(--text-brown, #59461b);
`;

const CardTitle = styled.h5`
  margin: 0;
  font-weight: bold;
  font-size=5px;
`;

const CommentText = styled.div`
  margin: 0.5rem 0;
  font-style: italic;
  color: var(--text-muted, #555);
`;

const PostedDate = styled.small`
  margin-top: auto;
  color: var(--text-muted, #777);
  font-size: 0.6rem;
`;

const LoadMoreButtonContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Divider = styled.hr`
  margin: 10px 0;
  border: none;
  border-top: 1px solid var(--text-brown);
`;

const ReviewList = ({
  reviews,
  visibleReviews,
  setVisibleReviews,
  setShowModal,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <Header>
        <Title>All Reviews ({reviews.length})</Title>
        {user && (
          <CustomButton color='blue' onClick={() => setShowModal(true)}>
            Write a Review
          </CustomButton>
        )}
      </Header>
      <ReviewsGrid>
        {reviews.slice(0, visibleReviews).map((review) => (
          <CardContainer key={review._id}>
            <CardBody>
              <StarRating
                maxRating={5}
                size={24}
                defaultRating={review.rating}
                isReadOnly={true}
              />
              <CardTitle>{review.user} ✅</CardTitle>
              <Divider />
              <CommentText>"{review.comment}"</CommentText>
              <PostedDate>
                Posted on {new Date(review.createdAt).toLocaleDateString()}
              </PostedDate>
            </CardBody>
          </CardContainer>
        ))}
      </ReviewsGrid>
      {visibleReviews < reviews.length && (
        <LoadMoreButtonContainer>
          <CustomButton
            color='blue'
            onClick={() => setVisibleReviews((prev) => prev + 6)}
          >
            Load More Reviews
          </CustomButton>
        </LoadMoreButtonContainer>
      )}
    </Container>
  );
};

export default ReviewList;
