import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const RainbowButton = styled(Button)`
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-transform: none;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(90deg, violet, indigo, blue, green, yellow, orange, red);
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.7);
    transform: scale(1.05);
  }
`;

export default function AnimatedButton({ text, onClick }) {
  return <RainbowButton onClick={onClick}>{text}</RainbowButton>;
}
