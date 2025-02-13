import React from "react";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";
import BookListSection from "../../../components/BookListSection";
import styled from "styled-components";
import StartCanvas from "../../../components/canvas/Stars";

const SectionContainer = styled.div`
  background-color: var(--bg-beige);
  position: relative;
  z-index: 1000;
`;
const BooksList = () => {
  return (
    <>
      <SectionContainer>
        <StartCanvas />
        <Navbar />
        <BookListSection title='All Books' />
      </SectionContainer>
      <FooterPage />
    </>
  );
};

export default BooksList;
