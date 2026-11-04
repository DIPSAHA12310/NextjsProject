import { library } from "../Library";
import LIbraryCardSystem from "./LIbraryCard";
import LibraryData from "../../public/libraryData.json";

const LibraryCard = () => {
  const data: library[] = LibraryData;

  return (
    <div>
      <div className="text-4xl pt-10 font-bold">
        THE LIBRARY
      </div>

      <span>
        Twelve lifts covering every major muscle group.
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {data.map((card: library) => (
          <LIbraryCardSystem
            key={card.id}
            card={card}
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryCard;