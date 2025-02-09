import React from "react";
import Button from "react-bootstrap/Button";

const CustomButton = ({ color = "blue", icon, children, onClick }) => {
  const buttonStyles = {
    blue: {
      backgroundColor: "#59461b",
      borderColor: "#59461b",
      ":hover": {
        backgroundColor: "#59461b",
        borderColor: "#59461b",
      },
    },
    gray: {
      backgroundColor: "#fff7e7",
      borderColor: "#fff7e7",
      ":hover": {
        backgroundColor: "#fff7e7",
        borderColor: "#fff7e7",
      },
    },
  };

  return (
    <Button
      variant='custom'
      onClick={onClick}
      style={buttonStyles[color]}
      className='d-inline-flex align-items-center gap-2 rounded-5 px-4 py-2'
    >
      {icon && <span style={{ fontSize: "1.1rem" }}>{icon}</span>}
      <span>{children}</span>
    </Button>
  );
};

export default CustomButton;
