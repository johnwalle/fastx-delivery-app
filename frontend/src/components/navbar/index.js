import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fastX_logo from '../../assets/fastX-logo.png';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ShoppingCart } from 'lucide-react';
import authStore from '../../store/auth.store';
import cartStore from '../../store/cart.store';

import Cart from '../cart';


const Navbar = () => {
    // State for mobile menu visibility and dropdown visibility
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Toggle mobile menu
    const toggleMenu = () => setShowMenu(!showMenu);

    // Sample restaurant data
    const restaurants = [
        { name: 'Restaurant 1', route: '/restaurant/1' },
        { name: 'Restaurant 2', route: '/restaurant/2' },
        { name: 'Restaurant 3', route: '/restaurant/3' },
        { name: 'Restaurant 4', route: '/restaurant/4' },
        { name: 'All Restaurants', route: '/restaurants' },
        // Add more restaurants as needed
    ];

    // Common styles
    const navClassName = 'fixed py-2 z-30 w-full bg-[#A40C0C]';
    const textColorClass = 'text-white';
    const linkStyle = {
        fontSize: '17px',
        fontFamily: "'DM Sans', sans-serif"
    };

    // Reusable link component
    const NavLink = ({ to, children, className = '' }) => (
        <Link
            to={to}
            className={`${textColorClass} hover:text-gray-300 px-3 py-2 rounded-md ${className}`}
            style={linkStyle}
        >
            {children}
        </Link>
    );

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // Navbar.js


    const userData = authStore((state) => state.userData);
    const { getCartItemCount, cart , getCart} = cartStore();
    const cartLength = cart.items.length;
    
    useEffect(() => {
        if (userData) {
            getCart(userData.tokens.access.token);
        }
    }, [userData, getCart]);

            

    console.log('cartwdg', cart)
    console.log('cartLength', cartLength)
    const cartItemCount = getCartItemCount();



    return (
        <nav className={navClassName}>
            <div className="pr-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and brand name */}
                    <div className="flex items-center">
                        <a href="/">
                            <div className="flex items-center justify-center">
                                <img
                                    src={fastX_logo}
                                    alt="fastX logoX"
                                    className="w-32 h-auto md:w-40 md:h-auto lg:h-auto"
                                />
                            </div>
                        </a>

                        {/* Desktop navigation links */}
                        <div className="hidden md:block ml-5 relative">
                            <div
                                className="relative"
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                <NavLink to="/restaurants">Restaurants</NavLink>
                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute left-[70px] mt-2 w-48 bg-white shadow-3xl rounded-md">
                                        {restaurants.map(({ name, route }) => (
                                            <Link
                                                key={route}
                                                to={route}
                                                className="block text-sm px-4 py-2 text-red-500 hover:text-red-300"
                                            >
                                                {name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {/* Mobile menu button */}
                        <div className="pl-6 md:hidden">
                            <button
                                onClick={toggleMenu}
                                className={`${textColorClass} mobile_btns px-3 mr-2 py-2 rounded-md text-sm font-medium ml-2`}
                            >
                                {showMenu ? (
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>


                        {/* Conditional rendering based on user authentication */}
                        {userData ? (
                            // Links for logged-in users

                            <div className='flex '>
                                <div>
                                    <div className='flex gap-2 items-center cursor-pointer' onClick={handleClick}>
                                        <ShoppingCart className='text-white' />
                                        {(cartItemCount > 0 || cartLength > 0) && (
                                            <label className='bg-slate-200 rounded-full p-1 px-3 cursor-pointer'>
                                                {cartItemCount || cartLength}
                                            </label>
                                        )}

                                    </div>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Typography sx={{ p: 2 }}>
                                            <Cart />
                                        </Typography>
                                    </Popover>
                                </div>

                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <NavLink to="/dashboard">Dashboard</NavLink>
                                    </div>
                                </div>
                            </div>


                        ) : (
                            // Links for unauthorized users
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <NavLink to="/login">Login</NavLink>
                                    <Link
                                        className="text-red-600 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium ml-2"
                                        to="/signup"
                                        style={{
                                            ...linkStyle,
                                            background: '#ffffff',
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${showMenu ? 'block' : 'hidden'}`}>
                <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {userData ? (
                        // Links for logged-in users in mobile menu
                        <>
                            <button onClick={() => setShowMenu(false)}>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </button>
                        </>
                    ) : (
                        // Links for unauthorized users in mobile menu
                        <>
                            <button onClick={() => setShowMenu(false)}>
                                <NavLink to="/restaurants">Restaurants</NavLink>
                            </button>
                            <button onClick={() => setShowMenu(false)}>
                                <NavLink to="/login">Login</NavLink>
                            </button>
                            <button onClick={() => setShowMenu(false)}>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
