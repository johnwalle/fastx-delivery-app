import React, { useState, useEffect } from 'react';
import star from './assets/star.png';
import { Link } from 'react-router-dom';
import useRestaurantStore from '../../store/restaurant.store';
import MultipleLoaders from '../../components/loader/multiple.loader';

function AllRestaurantsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('All');
    const [sortOption, setSortOption] = useState('name-asc'); // Default sort option
    const { restaurants, loading, notFound, fetchRestaurants } = useRestaurantStore((state) => ({
        restaurants: state.restaurants,
        loading: state.loading,
        error: state.error,
        fetchRestaurants: state.fetchRestaurants,
        notFound: state.notFound,
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const restaurantsPerPage = 12;
    const cuisines = [
        'Indian',
        'Thai',
        'Italian',
        'Mediterranean',
        'Japanese',
        'American',
        'Mexican',
        'Chinese',
        'French',
        'Ethiopian',
        'Greek',
    ];

    useEffect(() => {
        const fetchData = () => {
            let query = '';
            if (searchQuery) {
                query = `search=${searchQuery}`;
            } else if (selectedCuisine !== 'All') {
                query = `cuisine=${selectedCuisine}`;
            }
            fetchRestaurants(query);
        };

        const debounceFetch = setTimeout(fetchData, 300);
        return () => clearTimeout(debounceFetch);
    }, [searchQuery, selectedCuisine, fetchRestaurants]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (selectedCuisine !== 'All') {
            setSelectedCuisine('All');
        }
    };

    const handleCuisineChange = (e) => {
        setSelectedCuisine(e.target.value);
        if (searchQuery !== '') {
            setSearchQuery('');
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Sorting function based on selected option
    const sortedRestaurants = [...restaurants].sort((a, b) => {
        if (sortOption === 'name-asc') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'name-desc') {
            return b.name.localeCompare(a.name);
        } else if (sortOption === 'rating') {
            return b.rating - a.rating; // High to low
        } else {
            return 0; // Default case if no sorting matches
        }
    });

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = sortedRestaurants.slice(
        indexOfFirstRestaurant,
        indexOfLastRestaurant
    );
    const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="pt-28 pb-10">
            <div className="lg:grid lg:grid-cols-10 flex flex-col lg:gap-0 gap-5">
                <div className="flex flex-col col-span-2 px-5 pt-0 lg:pt-20">
                    {/* Sorting Section */}
                    <div className="flex flex-col mb-5">
                        <label className="text-white font-bold mb-2">Sort By:</label>
                        <select
                            className="lg:w-full md:w-1/2 w-3/4 mb-3 cursor-pointer"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="name-asc">Name A-Z</option>
                            <option value="name-desc">Name Z-A</option>
                            <option value="rating">Highly Rated</option>
                        </select>
                    </div>

                    {/* Filter Section */}
                    <div className='flex'>
                        <img width="48" height="48" src="https://img.icons8.com/fluency/48/filter--v2.png" alt="filter--v2" />
                        <h2 className="md:text-2xl px-3 text-xl text-white font-bold">Filter By:</h2>
                    </div>

                    <input
                        type="search"
                        placeholder="Find Restaurants"
                        className="lg:w-full md:w-1/2 w-3/4 lg:mt-5"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <select
                        className="mt-5 lg:w-full md:w-1/2 w-3/4 cursor-pointer"
                        value={selectedCuisine}
                        onChange={handleCuisineChange}
                    >
                        <option value="All">All Cuisines</option>
                        {cuisines.map((cuisine, index) => (
                            <option key={index} value={cuisine}>
                                {cuisine}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="lg:col-span-8 col-span-10 px-5 lg:pr-5">
                    {loading ? (
                        <MultipleLoaders count={6} />
                    ) : notFound ? (
                        <div className="flex flex-col items-center justify-center p-5">
                            <img width="48" height="48" src="https://img.icons8.com/pulsar-gradient/48/clear-search.png" alt="clear-search" />
                            <h1 className="text-3xl font-bold text-gray-300 mb-3">
                                No Restaurants Found
                            </h1>
                            <p className="text-gray-400 text-center max-w-md mb-6">
                                We couldn't find any restaurants matching your search criteria.
                                Please try adjusting your filters or search again.
                            </p>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center gap-5">
                            {currentRestaurants.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-2 rounded-lg bg-[#fff] flex flex-col items-start"
                                >
                                    <img
                                        src={item.image}
                                        className="h-[130px] w-full object-cover rounded-xl"
                                    />
                                    <div className="mt-2">
                                        <Link to={`/restaurant/${item._id}`}>
                                            <h2 className="font-medium text-black line-clamp-1 text-xl">
                                                {item.name}
                                            </h2>
                                        </Link>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <img src={star} width={14} height={14} />
                                                <label className="text-gray-500 text-sm">
                                                    {item.rating}
                                                </label>
                                                {item.cuisine_types.map((cuisine, index) => (
                                                    <div
                                                        key={index}
                                                        className="text-sm text-white px-2 py-0 bg-blue-500 rounded-lg"
                                                    >
                                                        {cuisine}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!loading && restaurants.length > 12 && (
                        <div className="flex justify-center mt-5">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="mx-2 p-2 bg-gray-300 rounded-lg"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`mx-1 px-3 py-1 rounded-lg ${currentPage === i + 1
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-300 text-black'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="mx-2 p-2 bg-gray-300 rounded-lg"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllRestaurantsPage;
