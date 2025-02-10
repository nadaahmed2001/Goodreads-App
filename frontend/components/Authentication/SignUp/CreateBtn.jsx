import React from 'react';
import styled from 'styled-components';

const CreateBtn = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="animated-button" onClick={onClick}>
        <span>Create Account</span>
        <span />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center; /* Centers button horizontally */
  align-items: center; 
  width: 100%;

  .animated-button {
    position: relative;
    display: inline-block;
    padding: 14px 50px;
    border: none;
    font-size: 16px;
    background-color: inherit;
    border-radius: 100px;
    font-weight: 600;
    color: #ffffff40;
    box-shadow: 0 0 0 2px #ffffff20;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    position: relative;
  }

  /* The background effect */
  .animated-button span:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background-color:rgba(201, 168, 101, 0.68);
    border-radius: 50%;
    opacity: 0;
    transition: width 0.4s ease, height 0.4s ease, opacity 0.2s ease;
  }

  .animated-button span:first-child {
    position: relative;
    z-index: 1;
  }

  /* Hover effect: expands to fully cover the button */
  .animated-button:hover {
    box-shadow: 0 0 0 5px rgba(188, 180, 153, 0.64)
;
    color: #ffffff;
  }

  .animated-button:hover span:last-child {
    width: 300px;  /* Fully covers the button */
    height: 300px; /* Fully covers the button */
    opacity: 1;
  }

  .animated-button:active {
    scale: 0.95;
  }
`;

export default CreateBtn;
