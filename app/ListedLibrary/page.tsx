
"use client";

import { LibraryProvider } from "@/app/context/LibraryContext";
import { library } from "@/app/Library";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import SavedDetails from "./Saved/SavedDetails";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const context = useContext(LibraryProvider);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<
    "default" | "duration" | "rating"
  >("default");

  if (!context) return <p>Context not found</p>;

  const { readlibrary, setreadlibrary, savelibrary } = context;

  const uniqueBooks = readlibrary.filter(
    (book, index, arr) =>
      arr.findIndex((item) => item.id === book.id) === index
  );

  const sortedBooks = [...uniqueBooks].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration) - Number(b.duration);
    }

    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating);
    }

    return 0;
  });

  const handleDelete = (id: library["id"]) => {
    setreadlibrary((prev) =>
      prev.filter((book) => book.id !== id)
    );
  };

  const totalDuration = uniqueBooks.reduce(
    (total, book) => total + Number(book.duration),
    0
  );

  const totalcalories = uniqueBooks.reduce(
    (total, book) => total + Number(book.caloriesBurned),
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My PLAN</h1>

      <p className="mb-4">
        Cap of five list for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-3 border rounded-xl p-4 shadow-sm mb-6">
        <div>
          <h2>Exercises</h2>
          <h3 className="text-4xl text-lime-300 font-bold">
            {uniqueBooks.length}
          </h3>
        </div>

        <div>
          <p className="mt-2">Minutes</p>
          <h4 className="text-4xl text-lime-300 font-bold">
            {totalDuration}
          </h4>
        </div>

        <div>
          <p className="mt-2">Calories</p>
          <h4 className="text-4xl text-lime-300 font-bold">
            {totalcalories}
          </h4>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("plan")}
          className={`btn ${
            activeTab === "plan" ? "btn-success" : "btn-outline"
          }`}
        >
          Add to Plan
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`btn ${
            activeTab === "saved" ? "btn-success" : "btn-outline"
          }`}
        >
          Saved
        </button>
      </div>

      {/* Add to Plan Section */}
      {activeTab === "plan" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Todays Plan</h2>

            <div className="flex items-center gap-3">
              <label htmlFor="sortBy">Sort By:</label>

              <select
                id="sortBy"
                className="select select-bordered"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "default"
                      | "duration"
                      | "rating"
                  )
                }
              >
                <option value="default">Default</option>
                <option value="duration">Duration</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {sortedBooks.length === 0 ? (
            <p>No exercises added to todays plan.</p>
          ) : (
            <div className="flex flex-col gap-4 mb-8">
              {sortedBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-start gap-4 border rounded-xl p-4 w-full"
                >
                  <div className="w-1/3 shrink-0">
                    <Image
                      src={book.image}
                      width={300}
                      height={200}
                      alt={book.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-3">
                    <h2 className="font-bold text-amber-50 text-3xl">
                      {book.name}
                    </h2>

                    <p>{book.equipment}</p>

                    <div className="flex items-center gap-4 flex-wrap">
                      <p>{book.duration} min</p>
                      <p>{book.caloriesBurned} Kcal</p>
                      <p>{book.rating}</p>

                      <div className="flex gap-4 items-center">
                        <button
  onClick={() => router.push(`/Library/${book.id}`)}
  className="btn btn-active"
>
  View Details
</button>

                        <button className="btn btn-success">
                          Mark as Done
                        </button>

                        <button
                          onClick={() => handleDelete(book.id)}
                          className="btn btn-error btn-circle"
                          title="Delete exercise"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Saved Section */}
      {activeTab === "saved" && (
        <>
          <h2 className="text-xl font-bold mb-4">
            Saved Exercises
          </h2>

          {savelibrary.length === 0 ? (
            <p>No saved exercises yet.</p>
          ) : (
            <div className="flex flex-col gap-4 mb-8">
              {savelibrary.map((savedId) => (
                <SavedDetails
                  key={savedId}
                  savedId={savedId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const SavedExercise = ({ savedId }: { savedId: string }) => {
  return <SavedExerciseDetails savedId={savedId} />;
};

const SavedExerciseDetails = ({ savedId }: { savedId: string }) => {
  const [book, setBook] = useState<library | null>(null);

  useEffect(() => {
    const getLibrary = async () => {
      const res = await fetch(
        "https://api.abcz.workers.dev/api/fitlog/"
      );

      const data: library[] = await res.json();

      const selectedBook = data.find(
        (item) => String(item.id) === String(savedId)
      );

      setBook(selectedBook ?? null);
    };

    getLibrary();
  }, [savedId]);

  if (!book) return null;

  return (
    <div className="border rounded-xl p-4">
      <Image
        src={book.image}
        width={300}
        height={200}
        alt={book.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h3 className="text-xl font-bold mt-3">{book.name}</h3>
      <p>{book.equipment}</p>
      <p>{book.duration} min</p>
      <p>{book.caloriesBurned} Kcal</p>
      <p>Rating: {book.rating}</p>
    </div>
  );
};

export default Page;
