import React, { useContext } from "react"; // Import useState

import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../src/Pages/Payment/CheckoutButton";
import { AuthContext } from "../src/AuthContext"; // Import the context

const DemoSection = ({ demoText, bookId }) => {
  const { subscription } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubscription = () => {
    console.log("Subscribe button clicked");
  };

  return (
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
            <Button
              variant='success'
              onClick={() => navigate(`/books/${bookId}/full`)}
            >
              Read Full Book
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default DemoSection;
