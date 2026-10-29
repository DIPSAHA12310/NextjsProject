
"use client";

import { LibraryProvider } from "@/app/context/LibraryContext";
import { library } from "@/app/Library";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

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
      toast.warning("This exercise is already in your plan!");
      return;
    }

    if (readlibrary.length >= 5) {
      toast.error("Your plan is full! You can add only 5 exercises.");
      return;
    }

    setreadlibrary((prev) =>
      prev.some((book) => book.id === selectedLibrary.id)
        ? prev
        : [...prev, selectedLibrary]
    );

    toast.success("Exercise added to your plan!");

    router.push("/ListedLibrary");
  };

  const handleSave = () => {
    const id = String(selectedLibrary.id);

    if (savelibrary.includes(id)) {
      toast.warning("This exercise is already saved!");
      router.push("/ListedLibrary?saved=true");
      return;
    }

    setsavelibrary((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );

    toast.success("Exercise saved successfully!");

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
