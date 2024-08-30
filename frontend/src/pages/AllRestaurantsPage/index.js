import React, { useState } from 'react'
import burgerbliss from './assets/burger-bliss.png'
import star from './assets/star.png'
import { Link } from 'react-router-dom';

function AllRestaurantsPage() {
    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`mx-1 px-3 py-1 rounded-lg ${currentPage === i ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}>
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    const [currentPage, setCurrentPage] = useState(1);
    const restaurantsPerPage = 12;
    const cusines = ["Indian", "Thai", "Italian", "Mediterranean", "Japanese", "American", "Mexican", "Chinese",
        "French", "Ethiopian", "Greek"
    ];
    const restaurants = [
        { name: "The Spicy Spoon", rating: 4.5, cuisine: ["Indian", "Thai"] },
        { name: "Pasta Paradise", rating: 4.7, cuisine: ["Italian", "Mediterranean"] },
        { name: "Sushi Supreme", rating: 4.8, cuisine: ["Japanese"] },
        { name: "Burger Bliss", rating: 4.3, cuisine: ["American", "BBQ"] },
        { name: "Taco Town", rating: 4.6, cuisine: ["Mexican"] },
        { name: "Dragon Delight", rating: 4.4, cuisine: ["Chinese", "Asian Fusion"] },
        { name: "Le Petit Bistro", rating: 4.9, cuisine: ["French"] },
        { name: "Greek Gyros", rating: 4.2, cuisine: ["Greek", "Mediterranean"] },
        { name: "Curry Kingdom", rating: 4.5, cuisine: ["Indian"] },
        { name: "Veggie Villa", rating: 4.7, cuisine: ["Vegetarian", "Vegan"] }
    ];

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

    // Calculate total pages
    const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className='pt-28 pb-10'>
            <div className='lg:grid lg:grid-cols-10 flex flex-col lg:gap-0 gap-5'>
                <div className='flex flex-col col-span-2 px-5 pt-0 lg:pt-20'>
                    <h2 className='md:text-2xl text-xl text-white font-bold'>Filter By:</h2>
                    <input type='search' placeholder='Find Restaurants' className='lg:w-full md:w-1/2 w-3/4  lg:mt-5' />
                    <select className='mt-5 lg:w-full md:w-1/2 w-3/4'>
                        {cusines.map((cusine, index) => (
                            <option key={index}>{cusine}</option>
                        ))}
                    </select>
                </div>
                <div className='lg:col-span-8 col-span-10 px-5 lg:pr-5'>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center gap-5'>
                        {currentRestaurants.map((item, index) => (
                            <div key={index} className='p-2 rounded-lg bg-[#fff] flex flex-col items-start '>
                                <img src={burgerbliss}
                                    width={500}
                                    height={500}
                                    className='h-[130px] object-cover rounded-xl' />
                                <div className='mt-2 '>
                                    <Link to={'#'}><h2 className='font-medium text-black text-xl'>{item.name}</h2></Link>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <img src={star}
                                                width={14}
                                                height={14} />
                                            <label className='text-gray-500 text-sm'>{item.rating}</label>
                                            {item.cuisine.map((cusine, index) => (
                                                <div key={index} className='text-sm text-white px-2 py-0 bg-red-500 rounded-lg'>{cusine}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {currentRestaurants.length > 12 &&
                        <div className='flex justify-center mt-5'>
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className='mx-2 p-2 bg-gray-300 rounded-lg'>
                                Previous
                            </button>
                            {renderPageNumbers()}
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className='mx-2 p-2 bg-gray-300 rounded-lg'>
                                Next
                            </button>
                        </div>}
                </div>
            </div>
        </div >
    )
}

export default AllRestaurantsPage