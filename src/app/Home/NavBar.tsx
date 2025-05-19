"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { auth, provider } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

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
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref for dropdown wrapper div to detect outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Ref for the avatar button
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [role, setRole] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: currentUser.email,
            nickname: currentUser.displayName || "",
            role: "user",
          });
          console.log("New user created in Firestore with default role: user");
          setRole("user");
        } else {
          const fetchedRole = userSnap.data()?.role;
          console.log("Existing user role:", fetchedRole);
          setRole(fetchedRole || "user");
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      router.push("/"); // Redirect to main page without reload
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav
      className={`fixed mx-auto top-0 left-0 right-0 z-10 transition-colors duration-300`}
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
        <div className="flex items-center justify-end px-4 py-2 lg:py-4 mx-auto min-h-[60px] md:min-h-[80px] relative">
          <div className="md:hidden absolute right-4 top-4">
            <button
              onClick={() => setNavbarOpen((prev) => !prev)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              aria-label="Toggle menu"
            >
              {navbarOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center w-full justify-end gap-6 text-xl">
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
                {role === "admin" && (
                  <NavigationMenuItem key="admin">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/admin"
                        className="text-black hover:text-gray-700 transition-colors"
                      >
                        Admin
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* User avatar + dropdown or Login button */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  ref={buttonRef}
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  type="button"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/default-avatar.png"
                      alt="Default avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-black font-semibold">
                    {user.displayName || "User"}
                  </span>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                    <div className="px-4 py-3 border-b border-gray-100 text-gray-700 break-words">
                      {user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                      type="button"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                type="button"
              >
                Login
              </button>
            )}
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
        <div className="md:hidden bg-[#C4B3B7] border-t border-[#C4B3B7]">
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

            {/* Mobile user area: show avatar + info + logout or login button */}
            <li className="mt-4 border-t border-[#b4a9aa] pt-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/default-avatar.png"
                      alt="Default avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {user.displayName || "User"}
                    </span>
                    <span className="text-sm text-gray-700 break-words">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setNavbarOpen(false);
                    }}
                    className="ml-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setNavbarOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  type="button"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
