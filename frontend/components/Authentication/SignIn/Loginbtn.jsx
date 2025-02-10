import React from 'react';
import styled from 'styled-components';

const LoginBtn = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="animated-button" onClick={onClick}>
        <span>Login</span>
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
    
  }

  .animated-button span:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: rgba(201, 168, 101, 0.68);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .animated-button span:first-child {
    position: relative;
    z-index: 1;
  }

  .animated-button:hover {
    box-shadow: 0 0 0 5px #bcb499;
    color: #ffffff;
  }

  .animated-button:active {
    scale: 0.95;
  }

  .animated-button:hover span:last-child {
    width: 150px;
    height: 150px;
    opacity: 1;
  }
`;

export default LoginBtn;
