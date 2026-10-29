"use client";

import React, { ReactNode, createContext, useState } from "react";
import { library } from "@/app/Library";

interface ILibraryContext {
  readlibrary: library[];
  setreadlibrary: React.Dispatch<React.SetStateAction<library[]>>;
  savelibrary: string[];
  setsavelibrary: React.Dispatch<React.SetStateAction<string[]>>;
}

export const LibraryProvider = createContext<ILibraryContext | null>(null);

const LibraryContext = ({ children }: { children: ReactNode }) => {
  const [readlibrary, setreadlibrary] = useState<library[]>([]);
  const [savelibrary, setsavelibrary] = useState<string[]>([]);

  return (
    <LibraryProvider.Provider
      value={{
        readlibrary,
        setreadlibrary,
        savelibrary,
        setsavelibrary,
      }}
    >
      {children}
    </LibraryProvider.Provider>
  );
};

export default LibraryContext;