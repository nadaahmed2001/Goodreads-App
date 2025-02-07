import React from "react";

function test() {
  return (
    <div>
      <Container className='my-5 max-w-5xl flex-column'>
        <Row className='p-3'>
          <Col md={4} className=''>
            <img
              src={book.coverImage}
              alt={book.title}
              className='img-fluid rounded-4 shadow'
              style={{ maxWidth: "400px", width: "300px", height: "400px" }}
            />
          </Col>

          <Col
            md={8}
            style={{
              marginTop: "5px",
              marginLeft: "-80px",
            }}
          >
            <h1 className='display-4 fw-bold mb-3'>{book.title}</h1>

            <StarRating
              className='mb-4'
              maxRating={5}
              size={30}
              defaultRating={book.rating}
              isReadOnly={true}
            >
              {averageRating.toFixed(1)}/5
              {book.rating}/5
            </StarRating>

            <h4 className='lead text-muted mb-4  '>
              Category: {book.category.name}
            </h4>
            <p className='lead text-muted mb-4  '>By: author</p>
            <hr />

            {/* <p className='lead text-muted mb-4  '>By: {book.author.name}</p> */}
            {/* <p className='text-secondary fs-5 mb-4'>{book.description}</p> */}
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
              quam deleniti, doloribus unde, repellat neque dolore sapiente sit
              totam, nemo porro minus assumenda! Fugit molestias sunt
              laboriosam, perferendis architecto amet. Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Corrupti quam deleniti,
              doloribus unde, repellat neque dolore sapiente sit totam, nemo
              porro minus assumenda! Fugit molestias sunt laboriosam,
              perferendis architecto amet.
            </p>

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
                    <Dropdown.Item
                      onClick={() => handleAddToList("want_to_read")}
                    >
                      Want to Read
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Stack>
          </Col>
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
      ;
    </div>
  );
}

export default test;
