
"use client";

import React, { useContext } from "react";
import logo from "@/assists/logo.png";
import Image from "next/image";
import Link from "next/link";
import { LibraryProvider } from "@/app/context/LibraryContext";

const Navber = () => {
  const context = useContext(LibraryProvider);

  if (!context) return null;

  const { readlibrary, savelibrary } = context;

  const uniqueBooks = readlibrary.filter(
    (book, index, arr) =>
      arr.findIndex((item) => item.id === book.id) === index
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            ></div>
          </div>

          <div className="flex gap-1 items-center">
            <Image src={logo} alt="FITLOG logo" />
            <h2>FITLOG</h2>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="text-yellow-400">
              <a>Workouts</a>
            </li>

            <li>
              <Link href={"/ListedLibrary"}>My Plan</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-3">
          <Link href="/ListedLibrary" className="btn">
            Plan({uniqueBooks.length})
          </Link>

          <a className="btn">
            Saved ({savelibrary.length})
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navber;
