import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../src/Pages/Payment/CheckoutButton";
import { AuthContext } from "../src/AuthContext";
import CustomButton from "../components/CustomButton";

const DemoSection = ({ demoText, bookId }) => {
  const { subscription } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubscription = () => {
    console.log("Subscribe button clicked");
  };

  return (
    <>
      <hr className='my-5' />
      <Card className='shadow-lg p-4 mb-4'>
        <Card.Body>
          <Card.Text
            className={`demo-text ${
              subscription === "Active" ? "" : "blur-text"
            }`}
          >
            {demoText}
          </Card.Text>

          {subscription === "InActive" ? (
            <div className='text-center mt-3'>
              <CheckoutButton onClick={handleSubscription} />
            </div>
          ) : (
            <div className='text-center mt-3'>
              <CustomButton
                className='bg-success'
                onClick={() => navigate(`/BookPreview/${bookId}`)}
              >
                Read Full Book
              </CustomButton>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default DemoSection;
