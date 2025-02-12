import React from 'react';
import styled from 'styled-components';

const Switch = ({ role, onChange }) => {
  return (
    <StyledWrapper>
      <div className="checkbox-wrapper-35">
        <input
          name="switch"
          id="switch"
          type="checkbox"
          className="switch"
          checked={role === 'admin'} // Ensure this is always a boolean
          onChange={onChange}
        />
        <label htmlFor="switch">
          <span className="switch-x-toggletext">
            <span className="switch-x-unchecked">
              <span className="switch-x-hiddenlabel"> </span>User
            </span>
            <span className="switch-x-checked">
              <span className="switch-x-hiddenlabel"></span>Admin
            </span>
          </span>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .checkbox-wrapper-35 .switch {
    display: none;
  }

  .checkbox-wrapper-35 .switch + label {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    color: #333;
    font-family: 'Arial', sans-serif;
    user-select: none;
  }

  .checkbox-wrapper-35 .switch + label::before {
    content: '';
    background-color: #d1d1d1;
    border-radius: 50px;
    height: 20px;
    width: 40px;
    margin-right: 12px;
    transition: background-color 0.3s;
  }

  .checkbox-wrapper-35 .switch + label::after {
    content: '';
    position: absolute;
    background-color: white;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 2px;
    top: 2px;
    transition: transform 0.3s;
  }

  .checkbox-wrapper-35 .switch:checked + label::before {
    background-color:rgb(202, 178, 121);
  }

  .checkbox-wrapper-35 .switch:checked + label::after {
    transform: translateX(20px);
  }

  .checkbox-wrapper-35 .switch + label .switch-x-toggletext {
    display: inline-block;
    font-weight: bold;
    width: 80px;
    text-align: left;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-unchecked,
  .checkbox-wrapper-35 .switch + label .switch-x-checked {
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    top: -3px;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-unchecked {
    opacity: 1;
  }

  .checkbox-wrapper-35 .switch:checked + label .switch-x-unchecked {
    opacity: 0;
  }

  .checkbox-wrapper-35 .switch:checked + label .switch-x-checked {
    opacity: 1;
  }

  .checkbox-wrapper-35 .switch-x-checked {
    color: #e8e0c6;
  }

  .checkbox-wrapper-35 .switch-x-unchecked {
    color: rgb(255, 255, 255);
  }
`;

export default Switch;