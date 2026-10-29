
import { Suspense } from "react";
import { library } from "../Library";
import LIbraryCardSystem from "./LIbraryCard";

const getLibrary = async (): Promise<library[]> => {
  const res = await fetch("http://localhost:3000/libraryData.json", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch library data");
  }

  return res.json();
};

const LibraryContent = async () => {
  const LibraryData = await getLibrary();

  return (
    <div>
      <div className="text-4xl pt-10 font-bold">
        THE LIBRARY
      </div>

      <span>
        Twelve lifts covering every major muscle group.
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {LibraryData.map((card: library) => (
          <LIbraryCardSystem
            key={card.id}
            card={card}
          />
        ))}
      </div>
    </div>
  );
};

const LibraryCard = () => {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          Loading exercises...
        </div>
      }
    >
      <LibraryContent />
    </Suspense>
  );
};

export default LibraryCard;
