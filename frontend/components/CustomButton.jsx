import React from "react";
import Button from "react-bootstrap/Button";

const CustomButton = ({ color = "blue", icon, children, onClick }) => {
  const buttonStyles = {
    blue: {
      backgroundColor: "#088178",
      borderColor: "#088178",
      ":hover": {
        backgroundColor: "#088178",
        borderColor: "#088178",
      },
    },
    gray: {
      backgroundColor: "#828089",
      borderColor: "#828089",
      ":hover": {
        backgroundColor: "#6E6C73",
        borderColor: "#6E6C73",
      },
    },
  };

  return (
    <Button
      variant='custom'
      onClick={onClick}
      style={buttonStyles[color]}
      className='d-inline-flex align-items-center gap-2 rounded-4 px-4 py-2'
    >
      {icon && <span style={{ fontSize: "1.1rem" }}>{icon}</span>}
      <span>{children}</span>
    </Button>
  );
};

export default CustomButton;
