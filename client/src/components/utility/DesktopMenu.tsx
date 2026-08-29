import React from "react";
import Link from "next/link";
import navLinks from "@/data/nav.data";
import LinkButton from "../utility/LinkButton";
import { FaArrowRightLong } from "react-icons/fa6";

const DesktopMenu = () => {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="flex items-center justify-center gap-7 pr-7">
        {navLinks.map((link) => {
          return (
            <Link
              key={link.id}
              href={link.href}
              className="text-font-primary text-base font-medium capitalize"
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-5 border-l-2 border-l-border pl-7">
        <LinkButton variant="primary" href="/login" className="min-w-35">
          login
        </LinkButton>
        <LinkButton
          variant="secondary"
          href="/signup"
          className="min-w-35 gap-2 z-30 bg-background"
        >
          get started <FaArrowRightLong />
        </LinkButton>
      </div>
    </div>
  );
};

export default DesktopMenu;
