"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { motion } from "motion/react";
import LinkButton from "./LinkButton";
import navLinks from "@/data/nav.data";
import { HiXMark } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";

type MenuContents = {
  children: React.ReactNode;
  href: string;
};

const MenuContents = ({ children, href }: MenuContents) => {
  return (
    <Link
      href={href}
      className="w-full flex items-center justify-center py-2 capitalize text-base active:bg-accent text-font-primary transition-all duration-300"
    >
      {children}
    </Link>
  );
};

const MobileMenu = () => {
  const [openModel, setOpenModel] = React.useState(false);
  return (
    <Drawer open={openModel} onOpenChange={setOpenModel} swipeDirection="left">
      <DrawerTrigger
        render={
          <motion.button
            className="md:hidden"
            type="button"
            aria-label="open menu"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setOpenModel(true)}
          >
            <GiHamburgerMenu className="text-accent text-3xl" />
          </motion.button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between w-full mt-5">
            <Logo varient="xs" />
            <motion.button
              aria-label="close menu"
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 90, scale: 1.1 }}
              type="button"
              onClick={() => setOpenModel(false)}
            >
              <HiXMark className="text-2xl text-font-secondary" />
            </motion.button>
          </div>
        </DrawerHeader>
        <motion.div
          initial="hidden"
          animate={openModel ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.09,
              },
            },
          }}
          className="flex flex-1 flex-col justify-center gap-4 px-4"
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.35,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <MenuContents href={link.href}>{link.name}</MenuContents>
            </motion.div>
          ))}
        </motion.div>
        <DrawerFooter>
          <LinkButton variant="primary" href="/login" className="w-full">
            login
          </LinkButton>
          <LinkButton
            variant="secondary"
            href="/signup"
            className="w-full gap-2"
          >
            get started <FaArrowRightLong />
          </LinkButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
