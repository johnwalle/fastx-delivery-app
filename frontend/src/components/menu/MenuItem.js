import { ShoppingCart, SquarePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import burger from '../../pages/RestaurantDetail/assets/burger.png'

function MenuItem() {
    const [selected, setSelected] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState('');

    useEffect(() => {
        setSelected(burgerBliss.categories[0].category);
        filterMenu(burgerBliss.categories[0].category);
    }, [])

    const burgerBliss = {
        name: "Burger Bliss",
        rating: 4.3,
        location: "123 Main St, Springfield, USA",
        categories: [
            {
                category: "Burgers",
                dishes: [
                    {
                        name: "Classic Cheeseburger",
                        description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and house sauce.",
                        price: "$8.99"
                    },
                    {
                        name: "BBQ Bacon Burger",
                        description: "Grilled beef patty topped with crispy bacon, cheddar, BBQ sauce, and onion rings.",
                        price: "$10.49"
                    },
                    {
                        name: "Veggie Burger",
                        description: "Grilled vegetable patty with avocado, lettuce, tomato, and vegan mayo.",
                        price: "$9.49"
                    }
                ]
            },
            {
                category: "Sides",
                dishes: [
                    {
                        name: "French Fries",
                        description: "Crispy golden fries, lightly salted.",
                        price: "$2.99"
                    },
                    {
                        name: "Onion Rings",
                        description: "Thick-cut onion rings fried to a golden crisp.",
                        price: "$3.49"
                    },
                    {
                        name: "Sweet Potato Fries",
                        description: "Sweet and savory fries with a hint of cinnamon.",
                        price: "$3.99"
                    }
                ]
            },
            {
                category: "Beverages",
                dishes: [
                    {
                        name: "Soda",
                        description: "Choice of Coke, Diet Coke, Sprite, or Fanta.",
                        price: "$1.99"
                    },
                    {
                        name: "Milkshake",
                        description: "Creamy milkshake available in chocolate, vanilla, or strawberry.",
                        price: "$4.99"
                    },
                    {
                        name: "Iced Tea",
                        description: "Refreshing iced tea, available sweetened or unsweetened.",
                        price: "$2.49"
                    }
                ]
            },
            {
                category: "Desserts",
                dishes: [
                    {
                        name: "Chocolate Brownie",
                        description: "Rich chocolate brownie served warm with a drizzle of chocolate sauce.",
                        price: "$3.99"
                    },
                    {
                        name: "Apple Pie",
                        description: "Classic apple pie with a flaky crust, served with vanilla ice cream.",
                        price: "$4.49"
                    },
                    {
                        name: "Ice Cream Sundae",
                        description: "Vanilla ice cream topped with chocolate syrup, whipped cream, and a cherry.",
                        price: "$3.99"
                    }
                ]
            }
        ]
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCuisine(selectedValue);
        filterMenu(selectedValue);
    };


    const filterMenu = (category) => {
        const result = burgerBliss.categories.filter((item) => item.category == category);
        setMenuList(result[0])
    }
    return (
        <div>
            <div className='grid grid-cols-4'>
                <div className='hidden md:flex flex-col mr-10 gap-2'>
                    {burgerBliss.categories.map((item, index) => (
                        <button key={index}
                            onClick={() => {
                                filterMenu(item.category);
                                setSelected(item.category);
                            }}
                            className={`${selected === item.category && 'primary'} justify-start flex text-gray-200 lg:w-3/4`}>{item.category}</button>
                    ))}
                </div>
                <div className='md:hidden mb-3'>
                    <select
                        value={selectedCuisine}
                        onChange={handleSelectChange}
                        className='bg-transparent text-white border-red-700 focus:border-red-700'>
                        {burgerBliss.categories.map((category, index) => (
                            <option className='text-black' key={index} value={category.category}>
                                {category.category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='md:col-span-3 col-span-4'>
                    <h2 className='font-extrabold text-lg'>{menuList?.category}</h2>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
                        {menuList.dishes?.map((item, index) => (
                            <div key={index} className='p-2 flex gap-3 border rounded-xl
                        hover:border-primary cursor-pointer'>
                                <img src={burger}
                                    alt={item}
                                    width={120}
                                    height={120}
                                    className='h-[120px] w-[120px] object-cover rounded-xl' />
                                <div className='flex flex-col gap-1 w-full'>
                                    <h2 className='font-bold text-lg'>{item.name}</h2>
                                    <div className='text-gray-400 line-clamp-2 text-sm'>{item.description}</div>
                                    <div className='flex justify-between pr-5'>
                                        <div className='md:text-lg text-sm text-white'>{item.price}</div>
                                        <ShoppingCart className='text-red-500' onClick={() => console.log(item)} />
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

export default MenuItem