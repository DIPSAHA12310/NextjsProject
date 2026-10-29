
"use client";

import { LibraryProvider } from "@/app/context/LibraryContext";
import { library } from "@/app/Library";
import Image from "next/image";
import React, {
  Suspense,
  useContext,
  useState,
} from "react";
import SavedDetails from "./Saved/SavedDetails";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const ListedLibraryContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = useContext(LibraryProvider);

  const activeTab =
    searchParams.get("saved") === "true" ? "saved" : "plan";

  const [sortBy, setSortBy] = useState<
    "default" | "duration" | "rating" | "calories"
  >("default");

  if (!context) return <p>Context not found</p>;

  const {
    readlibrary,
    setreadlibrary,
    savelibrary,
    setsavelibrary,
    completedBooks,
    setCompletedBooks,
  } = context;

  const toNumber = (value: unknown) => {
    const number = Number.parseFloat(
      String(value ?? "").replace(/,/g, "")
    );

    return Number.isFinite(number) ? number : 0;
  };

  const uniqueBooks = readlibrary.filter(
    (book, index, arr) =>
      arr.findIndex((item) => item.id === book.id) === index
  );

  const sortedBooks = [...uniqueBooks].sort((a, b) => {
    if (sortBy === "duration") {
      return toNumber(a.duration) - toNumber(b.duration);
    }

    if (sortBy === "rating") {
      return toNumber(b.rating) - toNumber(a.rating);
    }

    if (sortBy === "calories") {
      return toNumber(b.caloriesBurned) - toNumber(a.caloriesBurned);
    }

    return 0;
  });

  const handleDelete = (id: library["id"]) => {
    setreadlibrary((prev) =>
      prev.filter((book) => book.id !== id)
    );

    setCompletedBooks((prev) =>
      prev.filter((item) => String(item) !== String(id))
    );

    toast.success("Exercise removed from your plan!");
  };

  const handleMarkAsDone = (id: library["id"]) => {
    const alreadyCompleted = completedBooks.some(
      (item) => String(item) === String(id)
    );

    if (alreadyCompleted) {
      toast.warning("This exercise is already completed!");
      return;
    }

    setCompletedBooks((prev) =>
      prev.some((item) => String(item) === String(id))
        ? prev
        : [...prev, id]
    );

    toast.success("Workout completed!");
  };

  const handleSavedMarkAsDone = (id: string) => {
    const book = uniqueBooks.find(
      (item) => String(item.id) === String(id)
    );

    if (book) {
      handleMarkAsDone(book.id);
    } else {
      toast.info("Add this exercise to your plan first!");
    }
  };

  const handleRemoveSaved = (id: string) => {
    setsavelibrary((prev) =>
      prev.filter((item) => String(item) !== String(id))
    );

    toast.success("Removed from Saved!");
  };

  const totalDuration = uniqueBooks.reduce(
    (total, book) => total + toNumber(book.duration),
    0
  );

  const totalcalories = uniqueBooks.reduce(
    (total, book) => total + toNumber(book.caloriesBurned),
    0
  );

  const completedCount = completedBooks.filter((id) =>
    uniqueBooks.some(
      (book) => String(book.id) === String(id)
    )
  ).length;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">My PLAN</h1>

      <p className="mb-4">
        Cap of five list for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border rounded-xl p-4 shadow-sm mb-6">
        <div>
          <h2>Exercises</h2>
          <h3 className="text-4xl text-lime-300 font-bold">
            {uniqueBooks.length}
          </h3>
        </div>

        <div>
          <p>Minutes</p>
          <h4 className="text-4xl text-lime-300 font-bold">
            {totalDuration}
          </h4>
        </div>

        <div>
          <p>Calories</p>
          <h4 className="text-4xl text-lime-300 font-bold">
            {totalcalories}
          </h4>
        </div>
      </div>

      <p className="mb-6">
        Completed: {completedCount} / {uniqueBooks.length}
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => router.replace("/ListedLibrary")}
          className={`btn ${
            activeTab === "plan" ? "btn-success" : "btn-outline"
          }`}
        >
          Add to Plan
        </button>

        <button
          onClick={() =>
            router.replace("/ListedLibrary?saved=true")
          }
          className={`btn ${
            activeTab === "saved" ? "btn-success" : "btn-outline"
          }`}
        >
          Saved ({savelibrary.length})
        </button>
      </div>

      {activeTab === "plan" && (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
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
                      | "calories"
                  )
                }
              >
                <option value="default">Default</option>
                <option value="duration">Duration</option>
                <option value="rating">Rating</option>
                <option value="calories">Calories</option>
              </select>
            </div>
          </div>

          {uniqueBooks.length === 0 ? (
            <p>No exercises added to todays plan.</p>
          ) : (
            <div className="flex flex-col gap-4 mb-8">
              {sortedBooks.map((book) => {
                const isCompleted = completedBooks.some(
                  (id) => String(id) === String(book.id)
                );

                return (
                  <div
                    key={book.id}
                    className="flex flex-col sm:flex-row items-start gap-4 border rounded-xl p-4 w-full"
                  >
                    <div className="w-full sm:w-1/3 shrink-0">
                      <Image
                        src={book.image}
                        width={300}
                        height={200}
                        alt={book.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <h2 className="font-bold text-amber-50 text-2xl sm:text-3xl">
                        {book.name}
                      </h2>

                      <p>{book.equipment}</p>

                      <div className="flex items-center gap-4 flex-wrap">
                        <p>{book.duration} min</p>
                        <p>{toNumber(book.caloriesBurned)} Kcal</p>
                        <p>Rating: {book.rating}</p>
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <button
                          onClick={() =>
                            router.push(`/Library/${book.id}`)
                          }
                          className="btn btn-active"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => handleMarkAsDone(book.id)}
                          disabled={isCompleted}
                          className="btn btn-success"
                        >
                          {isCompleted
                            ? "Completed ✓"
                            : "Mark as Done"}
                        </button>

                        <button
                          onClick={() => handleDelete(book.id)}
                          className="btn btn-error"
                          title="Delete exercise"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

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
                <div
                  key={savedId}
                  className="border rounded-xl p-3"
                >
                  <SavedDetails
                    savedId={savedId}
                    onMarkAsDone={handleSavedMarkAsDone}
                  />

                  <button
                    onClick={() => handleRemoveSaved(savedId)}
                    className="btn btn-error mt-3"
                  >
                    Remove from Saved
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/Library/${savedId}`)
                    }
                    className="btn btn-active mt-3 ml-2"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          Loading your plan...
        </div>
      }
    >
      <ListedLibraryContent />
    </Suspense>
  );
};

export default Page;
