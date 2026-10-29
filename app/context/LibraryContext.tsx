
"use client";

import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { library } from "@/app/Library";

interface ILibraryContext {
  readlibrary: library[];
  setreadlibrary: React.Dispatch<React.SetStateAction<library[]>>;
  savelibrary: string[];
  setsavelibrary: React.Dispatch<React.SetStateAction<string[]>>;
  completedBooks: (string | number)[];
  setCompletedBooks: React.Dispatch<
    React.SetStateAction<(string | number)[]>
  >;
}

export const LibraryProvider = createContext<ILibraryContext | null>(null);

const LibraryContext = ({ children }: { children: ReactNode }) => {
  const [readlibrary, setreadlibrary] = useState<library[]>([]);
  const [savelibrary, setsavelibrary] = useState<string[]>([]);
  const [completedBooks, setCompletedBooks] = useState<
    (string | number)[]
  >([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("readlibrary");
      const savedExercises = localStorage.getItem("savelibrary");
      const savedCompleted = localStorage.getItem("completedBooks");

      if (savedPlan) {
        setreadlibrary(JSON.parse(savedPlan));
      }

      if (savedExercises) {
        setsavelibrary(JSON.parse(savedExercises));
      }

      if (savedCompleted) {
        setCompletedBooks(JSON.parse(savedCompleted));
      }
    } catch (error) {
      console.error("Failed to load saved data:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("readlibrary", JSON.stringify(readlibrary));
    localStorage.setItem("savelibrary", JSON.stringify(savelibrary));
    localStorage.setItem("completedBooks", JSON.stringify(completedBooks));
  }, [readlibrary, savelibrary, completedBooks, isLoaded]);

  return (
    <LibraryProvider.Provider
      value={{
        readlibrary,
        setreadlibrary,
        savelibrary,
        setsavelibrary,
        completedBooks,
        setCompletedBooks,
      }}
    >
      {children}
    </LibraryProvider.Provider>
  );
};

export default LibraryContext;
