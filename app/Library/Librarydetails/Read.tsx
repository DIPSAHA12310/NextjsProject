
"use client";

import { LibraryProvider } from "@/app/context/LibraryContext";
import { library } from "@/app/Library";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Read = ({ selectedLibrary }: { selectedLibrary: library }) => {
  const context = useContext(LibraryProvider);
  const router = useRouter();

  if (!context) return null;

  const {
      readlibrary,
  setreadlibrary,
  savelibrary,
  setsavelibrary,
  } = context;

  const handclick = () => {
    const alreadyAdded = readlibrary.some(
      (book) => book.id === selectedLibrary.id
    );

    if (alreadyAdded) {
      alert("This exercise is already in your plan!");
      return;
    }

    if (readlibrary.length >= 5) {
      alert("Your plan is full! You can add only 5 exercises.");
      return;
    }

    setreadlibrary((prev) =>
      prev.some((book) => book.id === selectedLibrary.id)
        ? prev
        : [...prev, selectedLibrary]
    );

    router.push("/ListedLibrary");
  };

  const handleSave = () => {
  const id = String(selectedLibrary.id);

  if (savelibrary.includes(id)) {
    alert("This exercise is already saved!");
    router.push("/ListedLibrary?saved=true");
    return;
  }

  setsavelibrary((prev) => [...prev, id]);

  router.push("/ListedLibrary?saved=true");
};

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handclick}
        className="bg-[#c6ff00] text-black text-xs font-semibold px-4 py-3 rounded-xl"
      >
        Add to todays plan
      </button>

      <button
        onClick={handleSave}
        className="bg-gray-200 text-black text-xs font-semibold px-4 py-3 rounded-xl"
      >
        Save
      </button>
    </div>
  );
};

export default Read;
