import React from "react";
import Link from "next/link";
import Image from "next/image";

const logoVariants = {
  xs: {
    icon: "h-6 w-6",
    text: "text-lg",
  },

  sm: {
    icon: "h-8 w-8",
    text: "text-xl",
  },

  md: {
    icon: "h-10 w-10",
    text: "text-2xl",
  },

  lg: {
    icon: "h-14 w-14",
    text: "text-3xl",
  },
};

// logo varient type
type LogoProps = {
  varient: keyof typeof logoVariants;
};

const Logo = ({ varient = "md" }: LogoProps) => {
  const style = logoVariants[varient];
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 z-40 select-none"
    >
      <Image
        src="/icon.svg"
        height={100}
        width={100}
        alt="kredo icon"
        loading="eager"
        className={`${style.icon}`}
      />
      <span className={`text-font-primary font-bold ${style.text}`}>KREDO</span>
    </Link>
  );
};

export default Logo;
