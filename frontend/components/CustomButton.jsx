import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid;
  width: 250px;
  .span {
    margin: auto;
  }
  ${({ color }) =>
    color === "blue" &&
    css`
      background-color: var(--bg-btn);
      border-color: var(--text-beige);
      color: var(--text-beige, #fff7e7);
      box-shadow:
        0 2px 6px rgb(255 255 255 / 45%),
        0 8px 24px rgb(255 255 255 / 24%);
      &:hover {
        //background-color: var(--text-brown-hover);
        border-color: var(--text-brown-hover);
        color: var(--text-brown-hover);
      }
    `}
  ${({ color }) =>
    color === "gray" &&
    css`
      background-color: var(--gray-bg, #fff7e7);
      border-color: var(--gray-bg, #fff7e7);
      color: var(--text-brown, #59461b);
      box-shadow:
        0 2px 6px rgb(255 255 255 / 45%),
        0 8px 24px rgb(255 255 255 / 24%);
      &:hover {
        background-color: var(--text-brown-hover);
        border-color: var(--text-brown-hover);
      }
    `};
`;

const CustomButton = ({ color = "blue", icon, children, onClick }) => {
  return (
    <StyledButton color={color} onClick={onClick}>
      {icon && <span style={{ fontSize: "1.1rem" }}>{icon}</span>}
      <span className='span'>{children}</span>
    </StyledButton>
  );
};

export default CustomButton;
