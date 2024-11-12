"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import NavLinks from "./NavLinks";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="text-white flex h-20 items-center justify-between px-5 sm:px-10 bg-slate-900 shadow-sm shadow-white">
      <Link
        href={"/"}
        className={`sm:text-2xl  text-xl font-serif font-semibold`}
      >
        Admin Panel
      </Link>
      <NavLinks />
      <UserButton />
    </div>
  );
};

export default Navbar;
