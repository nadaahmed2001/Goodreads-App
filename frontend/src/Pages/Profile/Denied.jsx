import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // For styled components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #ff7e5f, #feb47b); /* Red gradient */
  opacity: ${(props) => (props.$fadeIn ? 1 : 0)};  /* Use $fadeIn */
  transition: opacity 1s ease-out;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  opacity: ${(props) => (props.$fadeIn ? 1 : 0)};  /* Use $fadeIn */
  transform: ${(props) => (props.$fadeIn ? 'translateY(0)' : 'translateY(-30px)')};
  transition: transform 1s ease-out, opacity 1s ease-out;
  max-width: 600px;  /* Increased the card width */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

const Button = styled.button`
  --red: rgb(255, 0, 0); /* Red color */
  font-size: 15px;
  padding: 0.7em 2.7em;
  letter-spacing: 0.06em;
  position: relative;
  font-family: inherit;
  border-radius: 0.6em;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.4em;
  border: 2px solid var(--red);
  background: linear-gradient(to right, rgba(255, 99, 71, 0.1) 1%, transparent 40%, transparent 60%, rgba(255, 99, 71, 0.1) 100%); /* Red gradient */
  color: var(--red);
  box-shadow: inset 0 0 10px rgba(255, 69, 0, 0.4), 0 0 9px 3px rgba(255, 99, 71, 0.1); /* Red shadow */

  &:hover {
    color: rgb(255, 69, 0);
    box-shadow: inset 0 0 10px rgba(255, 69, 0, 0.6), 0 0 9px 3px rgba(255, 99, 71, 0.2); /* Hover shadow */
  }

  &:before {
    content: '';
    position: absolute;
    left: -4em;
    width: 4em;
    height: 100%;
    top: 0;
    transition: transform 0.4s ease-in-out;
    background: linear-gradient(to right, transparent 1%, rgba(255, 99, 71, 0.1) 40%, rgba(255, 99, 71, 0.1) 60%, transparent 100%); /* Red gradient */
  }

  &:hover:before {
    transform: translateX(15em);
  }
`;

export default function Denied() {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 1500); // Delay of 1.5 seconds for fade-in effect
  }, []);

  const handleSignInRedirect = () => {
    navigate('/sign-in'); // Redirect to the sign-in page
  };

  return (
    <Container $fadeIn={fadeIn}>  {/* Pass $fadeIn instead of fadeIn */}
      <Card $fadeIn={fadeIn}>  {/* Pass $fadeIn instead of fadeIn */}
        <Heading>Access Denied</Heading>
        <TextWrapper>
          <span>You must be logged in to view this page.</span>
        </TextWrapper>
        <Button onClick={handleSignInRedirect}>Login</Button>
      </Card>
    </Container>
  );
}
