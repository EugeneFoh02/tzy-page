"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const NavLinks = [
  { title: "Calendar", path: "/calendar" },
  { title: "Winner", path: "/winner" },
  { title: "Announcement", path: "/announcement" },
  { title: "Contact", path: "#contact" },
];

const PartnerLinks = [
  { title: "Partner 1" },
  { title: "Partner 2" },
  { title: "Partner 3" },
  { title: "Partner 4" },
];

const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -140 }}
      transition={{ type: "spring", stiffness: 35 }}
      className="fixed mx-auto top-0 left-0 right-0 z-10 transition-colors duration-300"
    >
      <Link href="/" className="absolute left-4 top-2 z-20">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={130}
          height={130}
          className="object-contain ml-10"
        />
      </Link>

      {/* First row */}
      <div
        className={`transition-colors duration-300 ${
          isScrolled
            ? "bg-gradient-to-b from-[#C4D5DD] to-[#E9EFFD] backdrop-blur-md"
            : "bg-gradient-to-b from-[#C4D5DD] to-[#E9EFFD]"
        }`}
      >
        <div className="flex items-center justify-end px-4 py-2 lg:py-4 mx-auto min-h-[60px] md:min-h-[80px]">
          <div className="md:hidden absolute right-4 top-4">
            <button
              onClick={() => setNavbarOpen((prev) => !prev)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              {navbarOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="hidden md:block text-xl">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-8">
                {NavLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.path}
                        className="text-black hover:text-gray-700 transition-colors"
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>

      {/* Second row */}
      <div
        className={`transition-colors duration-300 ${
          isScrolled
            ? "bg-gradient-to-b from-[#E9EFFD] to-[#fcfdff]"
            : "bg-gradient-to-b from-[#E9EFFD] to-[#fcfdff]"
        } py-2 min-h-[40px]`}
      >
        <div className="flex items-center justify-center gap-8 px-4 mx-auto ml-[120px] md:ml-[140px]">
          <div className="text-black text-lg font-semibold">Partners:</div>
          <div className="hidden md:flex space-x-4">
            {PartnerLinks.map((partner, index) => (
              <span key={index} className="text-black">
                {partner.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {navbarOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#C4B3B7] border-t border-[#C4B3B7]"
        >
          <ul className="flex flex-col p-4 space-y-2">
            {NavLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  onClick={() => setNavbarOpen(false)}
                  className="text-black hover:text-gray-700 transition-colors block"
                >
                  {link.title}
                </Link>
              </li>
            ))}
            {PartnerLinks.map((partner, index) => (
              <li key={`partner-${index}`}>
                <span className="text-black block">{partner.title}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavBar;
