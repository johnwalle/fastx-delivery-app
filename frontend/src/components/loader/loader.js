import React from 'react';
import { Link } from 'react-router-dom';

const Loader = () => {
    return (
        <div className="p-2 rounded-lg bg-[#fff] flex flex-col items-start animate-pulse">
            {/* Placeholder for image */}
            <div className="bg-neutral-400/50 h-[130px] w-full object-cover rounded-xl animate-pulse"></div>

            <div className="mt-2 w-full">
                {/* Placeholder for title */}
                <Link to={'/detail'}>
                    <div className="bg-neutral-400/50 h-6 w-3/4 animate-pulse rounded-md mb-2"></div>
                </Link>
                <div className="flex justify-between items-center gap-2">
                    {/* Placeholders for rating and cuisine details */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="bg-neutral-400/50 w-6 h-6 rounded-full animate-pulse"></div> {/* Placeholder for star icon */}
                        <div className="bg-neutral-400/50 w-10 h-4 animate-pulse rounded-md"></div> {/* Placeholder for rating */}
                        <div className="bg-neutral-400/50 w-16 h-4 animate-pulse rounded-md"></div> {/* Placeholder for cuisine type 1 */}
                        <div className="bg-neutral-400/50 w-16 h-4 animate-pulse rounded-md"></div> {/* Placeholder for cuisine type 2 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
