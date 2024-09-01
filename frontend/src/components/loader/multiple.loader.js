// MultipleLoaders.js
import React from 'react';
import Loader from './loader'; // Adjust the import path as needed

const MultipleLoaders = ({ count }) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center gap-5">
            {Array.from({ length: count }).map((_, index) => (
                <Loader key={index} />
            ))}
        </div>
    );
};

export default MultipleLoaders;
