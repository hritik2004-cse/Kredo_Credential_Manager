import React from "react";

const typeVarients = ["text", "password", "email"] as const;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  className?: string;
  type: (typeof typeVarients)[number];
  id: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = "text",
  className,
  placeholder,
  id,
  name,
  value,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      className={`${className} w-full p-2 text-font-primary placeholder:text-font-secondary text-base font-medium placeholder:text-base border-2 border-border outline-none rounded-md active:border-accent outline-accent focus-visible:border-accent focus:border-accent focus-within:border-accent`}
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
      required
    />
  );
};

export default Input;
