"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const LoadingData = () => {
    const cardData = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        title: `Card ${i + 1}`,
    }));
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialLimit = Math.min(parseInt(searchParams.get("limit") || "6", 10), cardData.length);
    const [displayedCards, setDisplayedCards] = useState(cardData.slice(0, initialLimit));
    const [moreData, setMoreData] = useState(cardData.slice(initialLimit, initialLimit + 6));
    const updateURL = (newLimit: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", newLimit.toString());
        router.replace(`?${params.toString()}`);
    };
    const loadMoreCards = () => {
        const nextLimit = Math.min(displayedCards.length + 6, cardData.length);
        const additionalCards = cardData.slice(displayedCards.length, nextLimit);
        setDisplayedCards((prev) => [...prev, ...additionalCards]);
        const updatedMoreData = cardData.slice(nextLimit, nextLimit + 6);
        setMoreData(updatedMoreData);
        updateURL(nextLimit);
    };
    const seeLessCards = () => {
        const nextLimit = Math.max(displayedCards.length - 6, 6); 
        const reducedCards = cardData.slice(0, nextLimit);
        setDisplayedCards(reducedCards);
        const updatedMoreData = cardData.slice(nextLimit, nextLimit + 6);
        setMoreData(updatedMoreData);
        updateURL(nextLimit);
    };
    useEffect(() => {
        console.log("Updated moreData:", moreData);
    }, [moreData]);
    useEffect(() => {
        console.log("Updated displayedCards:", displayedCards);
    }, [displayedCards]);

    return (
        <div className="pt-10">
            <h2 className="text-4xl text-center mb-8">Loading Cards</h2>
            <div className="flex flex-col md:flex-row justify-center gap-10 mb-10 text-center">
                <div className="p-4 border rounded-lg max-w-[400px] w-full">
                    <h3 className="font-bold">Displayed Cards</h3>
                    <p>visible cards: {displayedCards.length}</p>
                    <p>Id: {displayedCards.map((card) => card.id).join(", ")}</p>
                </div>
                <div className="p-4 border rounded-lg">
                    <h3 className="font-bold">New Cards (Stored)</h3>
                    <p>Cards store: {moreData.length}</p>
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
                            <p>{card.id}. Lorem ipsum dolor sit amet.</p>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 mt-6">
                    {displayedCards.length < cardData.length && (
                        <button onClick={loadMoreCards} className="px-6 py-2 rounded-md font-semibold border border-black transition-all duration-300 ease-linear hover:text-white hover:bg-black" >
                            Show More
                        </button>
                    )}

                    {displayedCards.length > 6 && (
                        <button
                            onClick={seeLessCards}
                            className="px-6 py-2 rounded-md font-semibold border border-black transition-all duration-300 ease-linear hover:text-white hover:bg-black"
                        >
                            See Less
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoadingData;
