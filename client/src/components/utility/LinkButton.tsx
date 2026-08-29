"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

const baseStyle =
  "flex items-center justify-center py-2 px-5 cursor-pointer text-base font-medium capitalize rounded-md border-2 whitespace-nowrap";

const buttonVariants = {
  primary: "bg-accent border-accent text-font-primary",
  secondary: "border-border text-font-primary",
};

type ButtonLinkProps = {
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
  href: string;
  className: string;
};

const LinkButton = ({
  children,
  variant = "primary",
  href,
  className,
}: ButtonLinkProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Link
        href={href}
        className={`${baseStyle} ${buttonVariants[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default LinkButton;
