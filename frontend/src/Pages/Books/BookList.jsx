import React from "react";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";
import BookListSection from "../../../components/BookListSection";
import styled from "styled-components";

const SectionContainer = styled.div`
  background-color: var(--bg-beige);
`;
const BooksList = () => {
  return (
    <>
      <SectionContainer>
        <Navbar />
        <BookListSection title='All Books' />
        <FooterPage />
      </SectionContainer>
    </>
  );
};

export default BooksList;
