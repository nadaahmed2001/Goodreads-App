import React from "react";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";
import BookListSection from "../../../components/BookListSection";

const BooksList = () => {
  return (
    <>
      <Navbar />
      <BookListSection title='All Books' />
      <FooterPage />
    </>
  );
};

export default BooksList;
