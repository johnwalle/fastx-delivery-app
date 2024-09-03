import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import burger from '../../pages/RestaurantDetail/assets/burger.png';
import authStore from '../../store/auth.store';

function MenuItem({ menuItems }) {
    const [selected, setSelected] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState('');

    // Access state and actions from the Zustand store
    const { userData } = authStore((state) => ({
        userData: state.userData
    }));

    const navigate = useNavigate();
    const cartHandler = (item) => {
        if (userData) {
            console.log('Item:', item);
            // Add logic to handle adding the item to the cart
        } else {
            navigate('/login'); // Navigate to the login page
        }
    };
    console.log('userData', userData);
    console.log('selected', selected);

    useEffect(() => {
        if (menuItems && menuItems.length > 0) {
            const categories = Object.keys(groupItemsByCategory(menuItems));
            setSelected(categories[0]);
            setSelectedCuisine(categories[0]);
            filterMenu(categories[0]);
        }
    }, [menuItems]);

    const groupItemsByCategory = (items) => {
        return items.reduce((groupedItems, item) => {
            const { category } = item;
            if (!groupedItems[category]) {
                groupedItems[category] = [];
            }
            groupedItems[category].push(item);
            return groupedItems;
        }, {});
    };

    const groupedMenuItems = groupItemsByCategory(menuItems);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCuisine(selectedValue);
        filterMenu(selectedValue);
    };

    const filterMenu = (category) => {
        const result = groupedMenuItems[category] || [];
        setMenuList(result);
    };

    return (
        <div>
            <div className='grid grid-cols-4'>
                <div className='hidden md:flex flex-col mr-10 gap-2'>
                    {Object.keys(groupedMenuItems).map((category, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                filterMenu(category);
                                setSelected(category);
                            }}
                            className={`${selected === category ? 'text-red-500' : 'text-gray-200'} justify-start flex lg:w-3/4`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className='md:hidden mb-3'>
                    <select
                        value={selectedCuisine}
                        onChange={handleSelectChange}
                        className='bg-transparent text-white border-red-700 focus:border-red-700'
                    >
                        {Object.keys(groupedMenuItems).map((category, index) => (
                            <option className='text-black' key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='md:col-span-3 col-span-4'>
                    <h2 className='font-extrabold text-lg'>{selected}</h2>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
                        {menuList.map((item) => (
                            <div
                                key={item.id}  // Assuming each item has a unique `id`
                                className='p-2 flex gap-3 border rounded-xl hover:border-primary cursor-pointer'
                            >
                                <img
                                    src={item.image || burger}
                                    alt={item.name}
                                    width={120}
                                    height={120}
                                    className='h-[120px] w-[120px] object-cover rounded-xl'
                                />
                                <div className='flex flex-col gap-1 w-full'>
                                    <h2 className='font-bold text-lg'>{item.name}</h2>
                                    <div className='text-gray-400 line-clamp-2 text-sm'>{item.description}</div>
                                    <div className='flex justify-between pr-5'>
                                        <div className='md:text-lg text-sm text-white'>{item.price} Birr</div>
                                        <ShoppingCart className='text-red-700 hover:text-red-400' onClick={() => cartHandler(item)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
