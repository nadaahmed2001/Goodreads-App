import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/AuthContext";
import CheckoutButton from "../src/Pages/Payment/CheckoutButton";
import CustomButton from "../components/CustomButton";

const CardContainer = styled.div`
  background-color: var(--bg-white) !important;
  width: 600px;
  margin: auto;
  padding: 1rem;
  // background-color: var(--bg-card, #ffffff);
  box-shadow:
    0 2px 6px rgb(255 255 255 / 45%),
    0 8px 24px rgb(255 255 255 / 24%);
  transition: all 0.3s ease;
  border-radius: 10px;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const DemoText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-brown) !important;
  transition:
    opacity 0.3s ease,
    filter 0.3s ease;
  &.blur-text {
    opacity: 1;
    filter: blur(0.6px);
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const DemoSection = ({ demoText, bookId }) => {
  const { subscription } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubscription = () => {
    console.log("Subscribe button clicked");
    // هنا ممكن تضيفي منطق الاشتراك الإضافي لو حابة
  };

  return (
    <CardContainer>
      <CardBody>
        <DemoText
          className={`demo-text ${subscription === "Active" ? "" : "blur-text"}`}
        >
          {demoText}
        </DemoText>
        <ButtonWrapper>
          {subscription === "InActive" ? (
            <CheckoutButton onClick={handleSubscription} />
          ) : (
            <CustomButton
              onClick={() => navigate(`/BookPreview/${bookId}`)}
              color='blue'
            >
              Read Full Book
            </CustomButton>
          )}
        </ButtonWrapper>
      </CardBody>
    </CardContainer>
  );
};

export default DemoSection;
