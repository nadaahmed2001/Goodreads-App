import React from "react";

const CustomButton = ({ color = "blue", icon, children, onClick }) => {
  const colors = {
    blue: "bg-[#3F8FC0] hover:bg-[#3578A0] text-white",
    gray: "bg-[#828089] hover:bg-[#6E6C73] text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm transition ${colors[color]}`}
    >
      {icon && <span className='text-lg'>{icon}</span>}
      {children}
    </button>
  );
};

export default CustomButton;
