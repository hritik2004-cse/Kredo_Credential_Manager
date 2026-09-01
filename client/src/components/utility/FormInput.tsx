import { div } from "motion/react-client";
import React from "react";
import type { IconType } from "react-icons";

const typeVarients = ["text", "password", "email"] as const;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  value: string;
  Icon: IconType;
  className?: string;
  placeholder?: string;
  type: (typeof typeVarients)[number];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({
  id,
  name,
  Icon,
  value,
  onChange,
  className,
  placeholder,
  type = "text",
  ...rest
}: InputProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <span className="absolute left-3">{Icon && <Icon className="text-accent text-lg " />}</span>
      <input
        type={type}
        className={`${className} w-full py-2 pl-10 text-font-primary placeholder:text-font-secondary text-base font-medium placeholder:text-base border-2 border-border outline-none rounded-md active:border-accent outline-accent focus-visible:border-accent focus:border-accent focus-within:border-accent`}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        required
      />
    </div>
  );
};

export default FormInput;
