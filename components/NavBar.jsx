"use client";
import { icons, images } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  {
    id: 1,
    name: "Courses",
    url: "/courses",
  },

  {
    id: 2,
    name: "About Us",
    url: "/about",
  },

  {
    id: 3,
    name: "FAQ",
    url: "/faq",
  },
];

const NavBar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <div className="flex items-center justify-between px-12 py-3">
      <Link href="/">
        <Image src={icons.logo} alt="logo" width={180} height={180} />
      </Link>
      <nav>
        <ul className="md:flex-between flex w-full flex-col items-center gap-5 md:flex-row">
          {navItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <li
                key={item.id}
                className={`${
                  isActive && "bg-black text-[#fff]"
                } flex min-w-28 items-center justify-center whitespace-nowrap rounded-lg bg-[#eeeeee] px-4 py-2 font-poppinsRegular text-lg hover:bg-[#FFC8B5]`}
              >
                <Link href={item.url}>{item.name}</Link>
              </li>
            );
          })}
          <li>
            <button
              className={`rounded-lg px-4 py-2 font-poppinsRegular text-lg text-white transition-all ${isHome ? "FFC8B5hover:bg-gray-800 bg-black" : "bg-brandSuccess hover:opacity-60"}`}
            >
              Get a Demo class
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
