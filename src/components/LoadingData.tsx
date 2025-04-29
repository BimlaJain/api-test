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
    const perPage = 6;

    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [page, setPage] = useState(initialPage);

    const updateURL = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.replace(`?${params.toString()}`);
    };

    const displayedCards = cardData.slice(0, page * perPage);
    const moreData = cardData.slice(page * perPage, (page + 1) * perPage);

    const loadMoreCards = () => {
        const newPage = page + 1;
        setPage(newPage);
        updateURL(newPage);
    };

    const seeLessCards = () => {
        const newPage = Math.max(page - 1, 1);
        setPage(newPage);
        updateURL(newPage);
    };

    useEffect(() => {
        updateURL(page);
    }, [page]);

    return (
        <div className="pt-10">
            <h2 className="text-4xl text-center mb-8">Loading Cards</h2>
            <div className="flex flex-col md:flex-row justify-center gap-10 mb-10 text-center">
                <div className="p-4 border rounded-lg max-w-[400px] w-full">
                    <h3 className="font-bold">Displayed Cards</h3>
                    <p>Visible cards: {displayedCards.length}</p>
                    <p>IDs: {displayedCards.map((card) => card.id).join(", ")}</p>
                </div>
                <div className="p-4 border rounded-lg">
                    <h3 className="font-bold">New Cards (Stored)</h3>
                    <p>Cards store: {moreData.length}</p>
                    <p>IDs: {moreData.map((card) => card.id).join(", ")}</p>
                </div>
                <div className="p-4 border border-black rounded-lg">
                    <h3 className="font-bold">Total CardData</h3>
                    <p>Total cards: {cardData.length}</p>
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
                        <button
                            onClick={loadMoreCards}
                            className="px-6 py-2 rounded-md font-semibold border border-black transition-all duration-300 ease-linear hover:text-white hover:bg-black"
                        >
                            Show More
                        </button>
                    )}

                    {page > 1 && (
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
