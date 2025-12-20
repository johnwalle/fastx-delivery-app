import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fastX_logo from '../../assets/fastX-logo.png';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ShoppingCart } from 'lucide-react';
import authStore from '../../store/auth.store';
import cartStore from '../../store/cart.store';
import useRestaurantStore from '../../store/restaurant.store';
import Cart from '../cart';
import useAdminRestaurantStore from '../../admin/restaurant.store';

const Navbar = () => {
    // State for mobile menu visibility and dropdown visibility
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Toggle mobile menu
    const toggleMenu = () => setShowMenu(!showMenu);

    // Sample restaurant data
    const { restaurants, fetchRestaurants } = useRestaurantStore();
    const { restaurantData, fetchRestaurantData } = useAdminRestaurantStore()


    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);



    // Function to get the top 5 restaurants by rating
    const topRestaurants = restaurants
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    // Navbar styles
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

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // Get user data from auth store
    const userData = authStore((state) => state.userData);
    const userRole = userData?.user?.role; // Assuming 'role' is available in userData

    // Cart logic
    const { getCartItemCount, cart, getCart } = cartStore();
    const cartLength = cart.items.length;

    useEffect(() => {
        if (userData) {
            getCart(userData.tokens.access.token);
        }
    }, [userData, getCart]);

    const cartItemCount = getCartItemCount();

    // get Admin's resturant data

    useEffect(() => {
        if (userRole === 'admin') {
            fetchRestaurantData(userData.tokens.access.token);
        }
    }, [fetchRestaurantData, userData, userRole]);




    return (
        <nav className={navClassName}>
            <div className="pr-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and brand name */}
                    <div className="flex items-center">
                        <a href="/">
                            <img
                                src={fastX_logo}
                                alt="fastX logoX"
                                className="w-32 h-auto md:w-40"
                            />
                        </a>

                        {/* Desktop navigation links */}
                        {
                            userRole === 'admin' ? (
                                <div className="hidden md:block ml-5 relative">
                                    <NavLink to={`/restaurant/${restaurantData?._id}`}>
                                        My Restaurant
                                    </NavLink>
                                </div>
                            ) : (
                                <div className="hidden md:block ml-5 relative">
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setShowDropdown(true)}
                                        onMouseLeave={() => setShowDropdown(false)}
                                    >
                                        <NavLink>Restaurants</NavLink>
                                        {showDropdown && (
                                            <div className="absolute left-[70px] mt-2 w-48 bg-white shadow-3xl rounded-md">
                                                {topRestaurants.map((restaurant) => (
                                                    <Link
                                                        key={restaurant._id}
                                                        to={`restaurant/${restaurant._id}`}
                                                        className="block line-clamp-1 text-sm px-4 py-2 text-red-500 hover:text-red-300"
                                                    >
                                                        {restaurant.name}
                                                    </Link>
                                                ))}
                                                <Link
                                                    to="/restaurants"
                                                    className="block text-sm px-4 py-2 text-blue-500 hover:text-blue-300 mt-2 border-t border-gray-200"
                                                >
                                                    All Restaurants
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }

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

                        {/* Links based on user authentication */}
                        {userData ? (
                            <div className="flex">


                                {userRole === 'user' && (
                                    <div>
                                        <div className="flex gap-2 items-center cursor-pointer" onClick={handleClick}>
                                            <ShoppingCart className="text-white" />
                                            {(cartItemCount > 0 || cartLength > 0) && (
                                                <label className="bg-slate-200 rounded-full p-1 px-3 cursor-pointer">
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
                                                <Cart onClose={handleClose}/>
                                            </Typography>
                                        </Popover>
                                    </div>)}

                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {!(userRole === 'admin' || userRole === 'super-admin') && (
                                            <button onClick={() => setShowMenu(false)}>
                                                <NavLink to="/dashboard">Dashboard</NavLink>
                                            </button>
                                        )}

                                        {/* Conditional Admin/Super Admin Links */}
                                        {userRole === 'admin' && (
                                            <NavLink to="/admin">Admin</NavLink>
                                        )}
                                        {userRole === 'super-admin' && (
                                            <NavLink to="/super-admin">Super Admin</NavLink>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
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
                </div >
            </div >

            {/* Mobile menu */}
            <div className={`md:hidden ${showMenu ? 'block' : 'hidden'}`}>
                <div className="flex justify-center items-center flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {userData ? (
                        <>
                            {/* User Role: Admin */}
                            {userRole === 'admin' ? (
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="text-left text-blue-600 hover:underline px-2 py-1"
                                >
                                    <NavLink to={`/restaurants/${restaurantData?._id}`}>
                                        My Restaurant
                                    </NavLink>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="text-left text-blue-600 hover:underline px-2 py-1"
                                >
                                    <NavLink to="/restaurants">Restaurants</NavLink>
                                </button>
                            )}

                            {/* Conditional Dashboard Link */}
                            {!(userRole === 'admin' || userRole === 'super-admin') && (
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="text-left text-blue-600 hover:underline px-2 py-1"
                                >
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </button>
                            )}

                            {/* Admin/Super Admin Links */}
                            {userRole === 'admin' && (
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="text-left text-blue-600 hover:underline px-2 py-1"
                                >
                                    <NavLink to="/admin">Admin</NavLink>
                                </button>
                            )}
                            {userRole === 'super-admin' && (
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="text-left text-blue-600 hover:underline px-2 py-1"
                                >
                                    <NavLink to="/super-admin">Super Admin</NavLink>
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Links for Unauthenticated Users */}
                            <button
                                onClick={() => setShowMenu(false)}
                                className="text-left text-blue-600 hover:underline px-2 py-1"
                            >
                                <NavLink to="/restaurants">Restaurants</NavLink>
                            </button>
                            <button
                                onClick={() => setShowMenu(false)}
                                className="text-left text-blue-600 hover:underline px-2 py-1"
                            >
                                <NavLink to="/login">Login</NavLink>
                            </button>
                            <button
                                onClick={() => setShowMenu(false)}
                                className="text-left text-blue-600 hover:underline px-2 py-1"
                            >
                                <NavLink to="/signup">Sign Up</NavLink>
                            </button>
                        </>
                    )}
                </div>
            </div>

        </nav >
    );
};

export default Navbar;
