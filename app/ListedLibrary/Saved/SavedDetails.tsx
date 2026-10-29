
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { library } from "@/app/Library";
import { useRouter } from "next/navigation";

interface ISavedDetails {
  savedId: string;
  onMarkAsDone: (id: string) => void;
}

const SavedDetails = ({
  savedId,
  onMarkAsDone,
}: ISavedDetails) => {
  const router = useRouter();

  const [book, setBook] = useState<library | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getLibrary = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog/"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data: library[] = await res.json();

        const selectedBook = data.find(
          (item) => String(item.id) === String(savedId)
        );

        setBook(selectedBook ?? null);

        if (!selectedBook) {
          setError(true);
        }
      } catch (error) {
        console.error("Failed to load exercise:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getLibrary();
  }, [savedId]);

  if (loading) {
    return <p className="p-4">Loading exercise...</p>;
  }

  if (error || !book) {
    return <p className="p-4">Exercise could not be loaded.</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 border rounded-xl p-4 w-full">
      <div className="w-full sm:w-1/4 shrink-0">
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

      <div className="flex-1 min-w-0 space-y-3">
        <h2 className="font-bold text-amber-50 text-2xl">
          {book.name}
        </h2>

        <p>{book.equipment}</p>

        <div className="flex flex-wrap items-center gap-4">
          <p>{book.duration} min</p>
          <p>{book.caloriesBurned} Kcal</p>
          <p>Rating: {book.rating}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => router.push(`/Library/${book.id}`)}
            className="btn btn-active"
          >
            View Details
          </button>

          <button
            onClick={() => onMarkAsDone(savedId)}
            className="btn btn-success"
          >
            Mark as Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedDetails;
