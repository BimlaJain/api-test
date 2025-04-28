"use client"
import React, { useState, useEffect } from "react";

const LoadingData = () => {
    const cardData = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        title: `Card ${i + 1}`,
    }));
    const [displayedCards, setDisplayedCards] = useState(cardData.slice(0, 6));
    const [moreData, setMoreData] = useState(cardData.slice(6, 12));
    const loadMoreCards = () => {
        const additionalCards = cardData.slice(
            displayedCards.length,
            displayedCards.length + 6
        );
        setDisplayedCards((prev) => [...prev, ...additionalCards]);
        const updatedMoreData = cardData.slice(
            displayedCards.length + 6,
            displayedCards.length + 12
        );
        setMoreData(updatedMoreData);
    };
    useEffect(() => {
        console.log("Updated moreData:", moreData);
    }, [moreData]);
    useEffect(() => {
        console.log("Updated displayedCards:", displayedCards);
    }, [displayedCards]);

    return (
        <div className="pt-10">
            <h2 className="text-4xl text-center mb-8">Array Task</h2>

            <div className="flex flex-col md:flex-row justify-center gap-10 mb-10 text-center">
                <div className="p-4 border rounded-lg  max-w-[400px] w-full">
                    <h3 className="font-bold">Displayed Cards</h3>
                    <p>visible cards: {displayedCards.length}</p>
                    <p>Id: {displayedCards.map((card) => card.id).join(", ")}</p>
                </div>

                <div className="p-4 border rounded-lg ">
                    <h3 className="font-bold">New Cards (Stored)</h3>
                    <p>Cards store {moreData.length}</p>
                    <p>IDs: {moreData.map((card) => card.id).join(", ")}</p>
                </div>

                <div className="p-4 border border-black rounded-lg">
                    <h3 className="font-bold">Total CardData</h3>
                    <p>total Cards: {cardData.length}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 p-8">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-4xl">
                    {displayedCards.map((card) => (
                        <div key={card.id} className="p-6 border border-black hover:bg-gray-200 rounded-lg shadow">
                            <h3 className="font-semibold">{card.title}</h3>
                            <p> {card.id}. Lorem ipsum dolor sit amet.</p>
                        </div>
                    ))}
                </div>

                {displayedCards.length < cardData.length && (
                    <button
                        onClick={loadMoreCards}
                        className="px-8 py-3 cursor-pointer rounded-md font-semibold border border-black transition-all duration-300 ease-linear hover:text-white hover:bg-black"
                    >
                        Show More
                    </button>
                )}
            </div>
        </div>
    );
};

export default LoadingData;