import React from 'react'
import RestraurantTabs from './Tabs';
import Intro from '../../components/intro/intro';

function RestaurantDetail() {
    const [alignValue, setAlignValue] = React.useState('center');
    return (
        <div className='px-3 pt-24 md:px-5 lg:px-20 lg:pt-28 mb-10'>
            <Intro />
            <RestraurantTabs />
        </div>
    )
}

export default RestaurantDetail