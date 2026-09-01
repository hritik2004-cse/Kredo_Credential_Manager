import React from "react";

const orientation = {
  row: "flex-row",
  col: "flex-col",
};

type FieldProps = {
  children: React.ReactNode;
  dir?: keyof typeof orientation;
  className?: string;
};

const Field = ({ children, dir = "row", className }: FieldProps) => {
  return (
    <div className={`flex gap-1 ${orientation[dir]} ${className}`}>
      {children}
    </div>
  );
};

export default Field;
