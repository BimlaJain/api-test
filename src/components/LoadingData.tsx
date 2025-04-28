'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const allInitialData = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `${i + 1} . Lorem ipsum dolor sit amet. `,
}));

const extraData = Array.from({ length: 28 }, (_, i) => ({
    id: i + 13,
    title: `${i + 13} . Lorem ipsum dolor sit amet.`,
}));

 function LoadingData() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const defaultCount = parseInt(searchParams.get('count') || '6', 10);
    const [count, setCount] = useState(defaultCount);

    const [displayData, setDisplayData] = useState<any[]>([]);

    useEffect(() => {
        const nextFromInitial = allInitialData.slice(0, count);
        const extraNeeded = count - nextFromInitial.length;

        const nextFromExtra = extraData.slice(0, Math.max(extraNeeded, 0));
        setDisplayData([...nextFromInitial, ...nextFromExtra]);
    }, [count]);

    const updateQuery = (newCount: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('count', newCount.toString());
        router.push(`/?${params.toString()}`);
    };

    const handleSeeMore = () => {
        const newCount = Math.min(count + 6, allInitialData.length + extraData.length);
        setCount(newCount);
        updateQuery(newCount);
    };

    const handleSeeLess = () => {
        const newCount = Math.max(count - 6, 6);
        setCount(newCount);
        updateQuery(newCount);
    };

    const noMoreToShow = count >= allInitialData.length + extraData.length;
    const noMoreToRemove = count <= 6;

    return (
        <div className="p-8 container mx-auto max-w-[1140px]">
            <h1 className="text-2xl font-bold mb-4 text-center">Items List</h1>
            <div className="grid grid-cols-2 gap-4">
                {displayData.map((item) => (
                    <div key={item.id} className="p-4 border rounded shadow">
                        {item.title}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center gap-4">
                {!noMoreToRemove && (
                    <button
                        onClick={handleSeeLess}
                        className="px-4 py-2 border border-black  text-black hover:text-white rounded hover:bg-black transition-all ease-linear duration-300"
                    >
                        See Less
                    </button>
                )}

                {!noMoreToShow && (
                    <button
                        onClick={handleSeeMore}
                        className="px-4 py-2 border border-black  text-black hover:text-white rounded hover:bg-black transition-all ease-linear duration-300"
                    >
                        See More
                    </button>
                )}
            </div>
        </div>
    );
}
export default LoadingData;
