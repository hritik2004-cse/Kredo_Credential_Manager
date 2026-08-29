"use client"

import React from "react";
import Logo from "../utility/Logo";
import MobileMenu from "../utility/MobileMenu";
import DesktopMenu from "../utility/DesktopMenu";

const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between py-5">
      <Logo varient="md"/>
      <MobileMenu />
      <DesktopMenu />
    </nav>
  );
};

export default NavBar;
