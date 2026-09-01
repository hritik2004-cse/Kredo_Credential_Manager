import React from "react";
import { cn } from "@/lib/utils";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
};

const Label = ({ children, htmlFor, className, ...props }: LabelProps) => {
  return (
    <label
      className={cn("ml-1 text-xs font-medium text-font-primary/90", className)}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;

