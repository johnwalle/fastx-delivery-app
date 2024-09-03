import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestraurantTabs from './Tabs';
import Intro from '../../components/intro/intro';
import useMenuStore from '../../store/menuItem.store';
import Spinner from '../../components/loader/spinner.loader';

function RestaurantDetail() {
    // Local state to manage alignment of components
    const [alignValue, setAlignValue] = React.useState('center');

    // Access state and actions from the Zustand store
    const { restaurant, menuItems, loading, error, notFound, fetchRestaurantAndMenuItems } = useMenuStore((state) => ({
        restaurant: state.restaurant,
        menuItems: state.menuItems,
        loading: state.loading,
        error: state.error,
        notFound: state.notFound,
        fetchRestaurantAndMenuItems: state.fetchRestaurantAndMenuItems,
    }));

    // Get the restaurant ID from the URL parameters
    const { restID } = useParams();

    useEffect(() => {
        if (restID) {
            fetchRestaurantAndMenuItems(restID); // Fetch restaurant and menu data based on restID
        }
    }, [restID, fetchRestaurantAndMenuItems]);




    // Display loading, error, and not found states
    if (loading) return <Spinner />;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (notFound) return <p className="text-center text-gray-600">Restaurant or menu items not found.</p>;

    return (
        <div className="px-3 pt-24 md:px-5 lg:px-20 lg:pt-28 mb-10">
            {/* Render Intro component */}
            <div className='pb-8'>
                <Intro restaurant={restaurant} />
            </div>
            {/* Render Restaurant Tabs */}
            <RestraurantTabs alignValue={alignValue} setAlignValue={setAlignValue} restaurant={restaurant} menuItems={menuItems} />
        </div>
    );
}

export default RestaurantDetail;
