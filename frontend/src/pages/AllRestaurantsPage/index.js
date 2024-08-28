import React from 'react'
import burgerbliss from './assets/burger-bliss.png'
import currykingdom from './assets/curry-kingdom.png'
import dragondelight from './assets/dragon-delight.png'
import greekgyros from './assets/greek-gyros.png'
import lepetit from './assets/lepetit.png'
import pastaparadise from './assets/pasta-paradise.png'
import spicyspoon from './assets/spicy-spoon.png'
import sushisupreme from './assets/sushi-supreme.png'
import tacotown from './assets/taco-town.png'
import veggievilla from './assets/veggie-villa.png'
import star from './assets/star.png'


function AllRestaurantsPage() {
    const cusines = ["Indian", "Thai", "Italian", "Mediterranean", "Japanese", "American", "Mexican", "Chinese",
        "French", "Ethiopian", "Greek"
    ];
    const restaurants = [
        { name: "The Spicy Spoon", rating: 4.5, cuisine: ["Indian", "Thai"], img: spicyspoon },
        { name: "Pasta Paradise", rating: 4.7, cuisine: ["Italian", "Mediterranean"], img: pastaparadise },
        { name: "Sushi Supreme", rating: 4.8, cuisine: ["Japanese"], img: sushisupreme },
        { name: "Burger Bliss", rating: 4.3, cuisine: ["American", "BBQ"], img: burgerbliss },
        { name: "Taco Town", rating: 4.6, cuisine: ["Mexican"], img: tacotown },
        { name: "Dragon Delight", rating: 4.4, cuisine: ["Chinese", "Asian Fusion"], img: dragondelight },
        { name: "Le Petit Bistro", rating: 4.9, cuisine: ["French"], img: lepetit },
        { name: "Greek Gyros", rating: 4.2, cuisine: ["Greek", "Mediterranean"], img: greekgyros },
        { name: "Curry Kingdom", rating: 4.5, cuisine: ["Indian"], img: currykingdom },
        { name: "Veggie Villa", rating: 4.7, cuisine: ["Vegetarian", "Vegan"], img: veggievilla }
    ];

    return (
        <div className='pt-28 pb-10'>
            <div className='grid grid-cols-10'>
                <div className='col-span-2 px-5 pt-20'>
                    <h2 className='text-2xl text-white font-bold'>Filter By:</h2>
                    <input type='search' placeholder='Find Restaurants' className='w-full mt-5' />
                    <select className='mt-5 w-full'>
                        {cusines.map((cusine, index) => (
                            <option>{cusine}</option>
                        ))}
                    </select>
                </div>
                <div className='col-span-8 pr-5'>
                    <div className='grid grid-cols-4 items-center gap-5'>
                        {restaurants.map((item, index) => (
                            <div key={index} className='p-2 rounded-lg bg-[#fff] flex flex-col items-start '>
                                <img src={item.img}
                                    width={500}
                                    height={500}
                                    className='h-[130px] object-cover rounded-xl' />
                                {/* <div className='text-black text-lg font-bold'>{item.name}</div> */}
                                <div className='mt-2 '>
                                    <h2 className='font-medium text-black text-xl'>{item.name}</h2>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <img src={star}
                                                width={14}
                                                height={14} />
                                            <label className='text-gray-500 text-sm'>4.5</label>
                                            {item.cuisine.map((cusine, index) => (
                                                <div className='text-sm text-white p-2 bg-red-500 rounded-lg'>{cusine}</div>
                                            ))}
                                        </div>
                                        {/* <h2 className='text-sm text-primary'>{business.categories[0]?.name}</h2> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllRestaurantsPage