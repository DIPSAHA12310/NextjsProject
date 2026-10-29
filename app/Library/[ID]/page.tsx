
import { library } from "@/app/Library";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Read from "../Librarydetails/Read";

interface IBookdetails {
    params: Promise<{
        ID: string;
    }>;
}

const getlibrary = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/fitlog/",
        { cache: "force-cache" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch library data");
    }

    return res.json();
};

const LibraryDetails = async ({ params }: IBookdetails) => {
    const { ID } = await params;
    const librarydata: library[] = await getlibrary();

    const selectedLibrary = librarydata.find(
        (item) => String(item.id) === ID
    );

    if (!selectedLibrary) {
        return (
            <h1 className="text-center text-2xl mt-10">
                Library not found
            </h1>
        );
    }

    return (
        <div className="min-h-screen bg-[#0e1014] text-white p-5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Image */}
                <div>
                    <Image
                        src={selectedLibrary.image}
                        alt={selectedLibrary.name}
                        width={600}
                        height={400}
                        className="w-full rounded-2xl object-cover"
                    />
                </div>

                {/* Details */}
                <div className="max-w-xl">
                    <h1 className="text-3xl font-extrabold uppercase tracking-tight">
                        {selectedLibrary.name}
                    </h1>

                    <p className="text-gray-400 text-sm leading-5 mt-2">
                        {selectedLibrary.description ||
                            "Explore the details of this item."}
                    </p>

                    {/* Categories */}
                    <div className="flex gap-2 mt-4">
                        <span className="bg-[#c6ff00] text-black text-[10px] font-semibold px-3 py-1 rounded-full">
                            {selectedLibrary.muscleGroups}
                        </span>
                    </div>

                    {/* Information */}
                    <div className="mt-6 bg-[#161a22] border border-[#252b36] rounded-2xl overflow-hidden">
                        {[
                            ["equipment", selectedLibrary.equipment],
                            ["difficulty", selectedLibrary.difficulty],
                            ["sets", selectedLibrary.sets],
                            ["reps", selectedLibrary.reps],
                            ["duration", `${selectedLibrary.duration} min`],
                            ["calories", `${selectedLibrary.caloriesBurned} Kcal`],
                            ["rating", selectedLibrary.rating],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex justify-between items-center px-5 py-4 border-b border-[#252b36]"
                            >
                                <span className="text-gray-400 text-[10px] font-bold tracking-wider">
                                    {label}
                                </span>
                                <span className="text-sm">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Instructions */}
                    <div className="mt-7">
                        <h2 className="text-sm font-extrabold tracking-wide">
                            Instructions
                        </h2>

                        <ul className="mt-4 text-xs text-gray-300 leading-6">
                            {Array.isArray(selectedLibrary.instructions)
                                ? selectedLibrary.instructions.map(
                                      (instruction: string, index: number) => (
                                          <li key={index}>{instruction}</li>
                                      )
                                  )
                                : selectedLibrary.instructions}
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 mt-8">
                       <Read selectedLibrary ={selectedLibrary} ></Read>

                        {/* <button
                            className="border border-[#343b49] text-white text-xs px-5 py-3 rounded-xl hover:bg-[#1b202a] transition"
                        >
                            Save for later
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Page({ params }: IBookdetails) {
    return (
        <Suspense
            fallback={
                <p className="text-white p-5">
                    Loading library...
                </p>
            }
        >
            <LibraryDetails params={params} />
        </Suspense>
    );
}
