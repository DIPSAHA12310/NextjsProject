
import React from "react";
import { library } from "../Library";
import Link from "next/link";
import Image from "next/image";

interface Ilibrary {
    card: library;
}

const LIbraryCardSystem = ({ card }: Ilibrary) => {
    return (
        <Link href={`/Library/${card.id}`}>
            <div className="card bg-base-100 w-full shadow-sm">
                <figure>
                    <Image
                        src={card.image}
                        alt={card.name}
                        width={400}
                        height={250}
                        className="w-full h-60 object-cover"
                    />
                </figure>

                <div className="card-body">
                    <h2 className="card-title">
                        <div className="badge badge-secondary">
                            {card.muscleGroups}
                        </div>
                    </h2>

                    <p className="text-2xl">{card.name}</p>

                    <h1>{card.equipment}</h1>

                    <div className="flex flex-wrap justify-between gap-2">
                        <span>{card.duration} min</span>
                        <span>{card.caloriesBurned} Kcal</span>
                        <span>⭐ {card.rating}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LIbraryCardSystem;
