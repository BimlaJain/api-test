'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface DataItem {
    id: string;
    title: string;
}

const initialData: DataItem[] = Array.from({ length: 12 }, (_, i) => ({
    id: `${i + 1}`,
    title: `${i + 1}. Lorem ipsum dolor sit amet.`,
}));

const extraData: DataItem[] = Array.from({ length: 28 }, (_, i) => ({
    id: `${i + 13}`,
    title: `${i + 13}. Lorem ipsum dolor sit amet.`,
}));

const allData: DataItem[] = [...initialData, ...extraData];

function LoadingData() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialCount = parseInt(searchParams.get('count') || '6', 10);
    const [count, setCount] = useState<number>(initialCount);

    const showMore = () => {
        setCount((prev) => Math.min(prev + 6, allData.length));
    };

    const showLess = () => {
        setCount((prev) => Math.max(prev - 6, 6));
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('count', count.toString());
        router.replace(`?${params.toString()}`, { scroll: false });
    }, [count, router]);

    return (
        <div className="p-8 container mx-auto max-w-[1140px]">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-black">Latest Articles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allData.slice(0, count).map((item) => (
                    <div key={item.id} className='group'>
                        <div  className="p-6 bg-white border rounded-xl group-hover:bg-black  transition-all duration-300 ease-linear">
                            <h2 className="text-lg font-semibold text-black group-hover:text-white">{item.title}</h2>
                        </div>
                   </div>
                ))}
            </div>

            <div className="mt-10 flex justify-center gap-6">
                {count > 6 && (
                    <button
                        onClick={showLess}
                        className="px-6 py-2 hover:bg-red-600 border border-black transition-all duration-200 ease-linear hover:text-white rounded-lg"
                    >
                        Show Less
                    </button>
                )}
                {count < allData.length && (
                    <button
                        onClick={showMore}
                        className="px-6 py-2 hover:bg-green-500 border border-black hover:text-white rounded-lg transition"
                    >
                        Show More
                    </button>
                )}
            </div>
        </div>
    );
}

export default LoadingData;
