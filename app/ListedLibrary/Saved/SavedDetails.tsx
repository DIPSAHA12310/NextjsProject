
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { library } from "@/app/Library";

interface ISavedDetails {
  savedId: string;
}

const SavedDetails = ({ savedId }: ISavedDetails) => {
  const [book, setBook] = useState<library | null>(null);

  useEffect(() => {
    const getLibrary = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog/"
        );

        const data: library[] = await res.json();

        const selectedBook = data.find(
          (item) => String(item.id) === String(savedId)
        );

        setBook(selectedBook ?? null);
      } catch (error) {
        console.error("Failed to load exercise:", error);
      }
    };

    getLibrary();
  }, [savedId]);

  if (!book) return <p>Loading exercise...</p>;

  return (
    <div className="flex items-center gap-6 border rounded-xl p-4 w-full">
      {/* Image on the left */}
      <div className="w-1/4 shrink-0">
        {book.image && (
          <Image
            src={book.image}
            width={300}
            height={200}
            alt={book.name || "Exercise image"}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Name and equipment */}
      <div className="flex-1 min-w-0 space-y-3">
        <h2 className="font-bold text-amber-50 text-2xl">
          {book.name}
        </h2>

        <p>{book.equipment}</p>

        {/* Duration, calories and rating */}
        <div className="flex items-center gap-4">
          <p className="whitespace-nowrap">
            {book.duration} min
          </p>

          <p className="whitespace-nowrap">
            {book.caloriesBurned} Kcal
          </p>

          <p className="whitespace-nowrap">
            {book.rating}
          </p>
        </div>
      </div>

      {/* Two buttons on the far right */}
      <div className="flex items-center gap-3 shrink-0">
        <button className="btn btn-active whitespace-nowrap">
          View Details
        </button>

        <button className="btn btn-success whitespace-nowrap">
          Mark as Done
        </button>
      </div>
    </div>
  );
};

export default SavedDetails;
