import React from "react";

// defining type for button
type ButtonProp = {
  children: React.ReactNode;
  varient?: keyof typeof buttonVarients;
};

const basicStyle =
  "py-2 transition-all duration-300 cursor-pointer text-base font-medium capitalize rounded-md";

const buttonVarients = {
  primary: "bg-accent",
  secondary: "",
  delete: "bg-red-200 hover:bg-red-300",
};

const Button = ({ children, varient = "primary" }: ButtonProp) => {
  return (
    <button className={`${basicStyle} ${buttonVarients[varient]}`}>
      {children}
    </button>
  );
};

export default Button;
