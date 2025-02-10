import React from "react";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";

export default function AboutUs() {
  return (
    <>
      <Navbar />

      <div className='container my-5'>
        <div className='card shadow-lg border-0 rounded-5'>
          <div className='card-body text-center py-5'>
            <h1 className='card-title display-4 text-dark mb-4'>About Us</h1>
            <p className='card-text fs-5 text-secondary'>
              Welcome to our platform! We are dedicated to providing the best
              experience for book lovers, offering a vast collection of books
              and a seamless reading journey.
            </p>
            <p className='card-text fs-5 text-secondary'>
              Our mission is to connect readers with their favorite books and
              authors while ensuring a user-friendly experience. Whether you're
              here to discover new reads or manage your book collection, we've
              got you covered!
            </p>
            <p className='card-text fs-5 text-secondary'>
              Thank you for being a part of our community. Happy reading! 📚
            </p>
          </div>
        </div>
      </div>

      <FooterPage />
    </>
  );
}
