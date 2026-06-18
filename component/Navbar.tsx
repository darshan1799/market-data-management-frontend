"use client";

import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Products", href: "#", active: false },
  { label: "Services", href: "#", active: false },
  { label: "Contact Us", href: "#", active: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="h-12 bg-white z-50 flex justify-center w-full shadow-md ">
      <div className="container xl:max-w-420 flex items-center justify-between  px-4 md:px-6 relative z-50 ">
        <div className="flex-shrink-0 font-semibold text-gray-800 text-base ">
          Logo
        </div>

        <ul className="hidden md:flex items-center gap-6 mr-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-sm transition-colors ${
                  link.active
                    ? "font-bold text-gray-900"
                    : "font-normal text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3 ml-2">
          <div className="relative cursor-pointer">
            <IoNotificationsOutline
              className="text-gray-700 hover:text-purple-600 transition-colors"
              size={22}
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
              3
            </span>
          </div>

          <div className="cursor-pointer">
            <FaUserCircle
              className="text-gray-700 hover:text-purple-600 transition-colors"
              size={28}
            />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-3 ml-2">
          <div className="relative cursor-pointer">
            <IoNotificationsOutline className="text-gray-700" size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-3 h-3 flex items-center justify-center leading-none">
              3
            </span>
          </div>
          <FaUserCircle className="text-gray-700" size={24} />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="text-gray-700 hover:text-purple-600 transition-colors ml-1"
          >
            {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-12 left-0 w-full bg-white border-t border-purple-200 shadow-md flex flex-col md:hidden z-40">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-6 py-3 text-sm border-b border-gray-100 transition-colors ${
                  link.active
                    ? "font-bold text-gray-900 bg-purple-50"
                    : "font-normal text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
