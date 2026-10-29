
"use client";

import { LibraryProvider } from "@/app/context/LibraryContext";
import { library } from "@/app/Library";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Read = ({ selectedLibrary }: { selectedLibrary: library }) => {
  const context = useContext(LibraryProvider);
  const router = useRouter();

  if (!context) return null;

  const { setreadlibrary, setsavelibrary } = context;

  const handclick = () => {
    setreadlibrary((prev) =>
      prev.some((book) => book.id === selectedLibrary.id)
        ? prev
        : [...prev, selectedLibrary]
    );

    router.push("/ListedLibrary");
  };

const handleSave = () => {
  setsavelibrary((prev) => {
    const id = String(selectedLibrary.id);

    if (prev.includes(id)) return prev;

    return [...prev, id];
  });
};

  return (
    <div className="flex gap-2">
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
