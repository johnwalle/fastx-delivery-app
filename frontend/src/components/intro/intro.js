import React from 'react'
import burgerbliss from '../../pages/RestaurantDetail/assets/burger-bliss.png'
import star from '../../pages/RestaurantDetail/assets/star.png'
import { Mail, MapPin, PhoneOutgoing } from 'lucide-react';

function Intro() {
    const burgerBliss = {
        name: "Burger Bliss",
        desc: "Bliss Burger is a cozy spot offering gourmet burgers made with fresh, quality ingredients. Enjoy our signature creations or classic favorites in a vibrant, casual setting. Every bite promises pure bliss.",
        rating: 4.3,
        location: "123 Main St, Springfield, USA",
        phone: "+251972204823",
        email: "burgerbliss@mail.com",
        open: false,
        cuisine: ["American", "BBQ"],
        categories: [
            {
                category: "Burgers",
                dishes: ["Classic Cheeseburger", "BBQ Bacon Burger", "Veggie Burger"]
            },
            {
                category: "Sides",
                dishes: ["French Fries", "Onion Rings", "Sweet Potato Fries"]
            },
            {
                category: "Beverages",
                dishes: ["Soda", "Milkshake", "Iced Tea"]
            },
            {
                category: "Desserts",
                dishes: ["Chocolate Brownie", "Apple Pie", "Ice Cream Sundae"]
            }
        ]
    };
    return (
        <div>
            <div>
                <img src={burgerbliss} alt='banner'
                    width={500}
                    height={100}
                    className='w-full h-[220px] object-cover rounded-xl'
                />
            </div>
            {/* <div className='bg-slate-200 w-full h-[220px] rounded-xl animate-pulse'>
            </div> */}
            <div className='flex md:justify-between flex-col md:flex-row mb-4 md:mb-0 gap-5 md:gap-0'>
                <div>
                    <div className='flex items-center gap-2'>
                        <h2 className='text-2xl md:text-3xl mt-3 font-bold'>{burgerBliss.name}</h2>
                        <div className={`${burgerBliss.open ? 'bg-green-500' : 'bg-red-500'} text-sm text-white px-2 py-0 rounded-lg`}>{burgerBliss.open ? 'open' : 'closed'}</div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='flex items-center gap-2 mt-2'>
                            <img src={star} alt='star'
                                width={14}
                                height={14} />
                            <label className='text-gray-400'>{4.5} ({4})</label>
                        </div>
                        <div className='flex gap-2'>
                            {burgerBliss.cuisine.map((cusine, index) => (
                                <div key={index} className='text-sm text-white px-2 py-0 bg-blue-500 rounded-lg'>{cusine}</div>
                            ))}
                        </div>
                    </div>
                    <div className='text-gray-400 text-sm mt-2 md:w-3/4'>{burgerBliss.desc}</div>
                </div>
                <div className='flex flex-col gap-2 items-start md:pt-5 md:pr-8 lg:pt-7 lg:pr-10'>
                    <div className='text-gray-400 text-sm flex items-center gap-2 '><MapPin color='white' />{burgerBliss.location}</div>
                    <div className='flex items-center gap-2 text-gray-400'><PhoneOutgoing color='white' />{burgerBliss.phone}</div>
                    <div className='flex items-center gap-2 text-gray-400'><Mail color='white' />{burgerBliss.email}</div>
                </div>
            </div>
        </div >
    )
}

export default Intro