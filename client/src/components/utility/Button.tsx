import React from "react";
import { motion } from "motion/react";

// defining type for button
type ButtonProp = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
};

const basicStyle =
  "py-3 transition-all duration-300 cursor-pointer text-base font-medium capitalize rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse";

const buttonVariants = {
  primary: "bg-accent text-font-primary",
  secondary: "border-2 border-font-secondary text-font-primary",
  delete: "bg-red-200 hover:bg-red-300",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  disabled,
  ...props
}: ButtonProp) => {
  return (
    <motion.div
      whileTap={disabled ? undefined : { scale: 0.96 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="w-full flex items-center justify-center"
    >
      <button
        className={`${basicStyle} ${buttonVariants[variant]}`}
        type={type}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
