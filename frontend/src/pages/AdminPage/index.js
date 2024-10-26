import { Box, createTheme, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ChartNoAxesGantt, Pencil, ChevronDown } from 'lucide-react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppProvider } from '@toolpad/core/AppProvider';
import fastXLogo from '../../assets/fastX-logo.png';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import UpdateRestaurantForm from '../../components/updateRestaurantForm';
import useAdminRestaurantStore from '../../admin/restaurant.store';
import useAdminMenuStore from '../../admin/menu.store';
import authStore from '../../store/auth.store';
import axios from 'axios';

const NAVIGATION = [
    {
        segment: 'overview',
        title: 'Overview',
        icon: <ChartNoAxesGantt />,
    },
    {
        segment: 'menu',
        title: 'Menu Items',
        icon: <Pencil />,
    },
    {
        segment: 'profile',
        title: 'Restaurant Profile',
        icon: <AccountBoxIcon />,
    },
];

const customTheme = createTheme({
    palette: {
        background: {
            default: '#F9F9FE',
            paper: '#A40C0C',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
        action: {
            active: '#ffffff',
            hover: '#a72828',
            selected: '#FF6347',
            disabled: '#BDBDBD',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
    const { restaurantData, fetchRestaurantData } = useAdminRestaurantStore((state) => ({
        restaurantData: state.restaurantData,
        fetchRestaurantData: state.fetchRestaurantData,
    }));

    const { menuItems, fetchAllMenuItems, loading, error, notFound } = useAdminMenuStore((state) => ({
        menuItems: state.menuItems,
        loading: state.loading,
        error: state.error,
        notFound: state.notFound,
        fetchAllMenuItems: state.fetchAllMenuItems,
    }));

    const { userData } = authStore();
    const token = userData?.tokens?.access?.token || null;

    const [menuItemsState, setMenuItems] = useState(menuItems);

    console.log("menuItemssssssssssss", menuItemsState);


    const logoutHandler = () => {
        authStore.getState().clearUserData();
    };


    // Fetch the restaurant data on component mount
    useEffect(() => {
        fetchRestaurantData(token);
    }, [token, fetchRestaurantData]);

    // Fetch menu items when navigating to the menu section
    useEffect(() => {
        if (pathname === '/menu') {
            fetchAllMenuItems(token);
        }
    }, [pathname, token, fetchAllMenuItems]);

    useEffect(() => {
        setMenuItems(menuItems); // Sync local state with store state
    }, [menuItems]);

    const deleteMenuItem = async (menuItemId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/menu/delete/${menuItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const updatedMenuItems = menuItemsState.filter((menu) => menu._id !== menuItemId);
                setMenuItems(updatedMenuItems);
                console.log('Menu item deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting menu item:', error);
        }
    };

    return (
        <Box sx={{ py: 4, px: 3 }}>
            {pathname === '/overview' ? (
                <Typography>
                    <div>
                        <h1 className="text-4xl font-bold mb-6">Overview</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-[#3b1f1b] p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold">Earnings Today</h2>
                                <p className="mt-4 text-2xl">$320</p>
                            </div>
                            <div className="bg-[#3b1f1b] p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold">Orders Today</h2>
                                <p className="mt-4 text-2xl">12 Orders</p>
                            </div>
                            <div className="bg-[#3b1f1b] p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold">Recent Reviews</h2>
                                <p className="mt-4">"Great service!" - John</p>
                                <p className="mt-2">"Loved the food!" - Emily</p>
                            </div>
                        </div>
                        <div class="mt-8">
                            <button class="py-2 primary text-white rounded-lg focus:outline-none" onClick={logoutHandler}>
                                Logout
                            </button>
                        </div>
                    </div>
                </Typography>
            ) : pathname === '/menu' ? (
                <div>
                    <div className="border rounded-lg">
                        {loading ? (
                            <p>Loading menu items...</p>
                        ) : error ? (
                            <p>Error loading menu items</p>
                        ) : notFound ? (
                            <p>No menu items found</p>
                        ) : (
                            <TableContainer sx={{ backgroundColor: 'transparent' }} component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }}>Menu Items</TableCell>
                                            <TableCell sx={{ color: 'white' }} align="right"></TableCell>
                                            <TableCell sx={{ color: 'white' }} align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {menuItemsState.map((menu) => (
                                            <TableRow
                                                key={menu._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ color: 'white' }} component="th" scope="row">
                                                    {menu.name}
                                                </TableCell>
                                                <TableCell sx={{ color: 'white' }} align="right">
                                                    <Link className="text-white" to={`/update-menu/${menu._id}`}>
                                                        <button className="bg-green-500 py-0 round-md">Update</button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell sx={{ color: 'white' }} align="right">
                                                    <button
                                                        className="primary py-0"
                                                        onClick={() => deleteMenuItem(menu._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </div>
                    <div className='mt-10'>
                        <Link to={'/create-menu'}>
                            <button class="flex items-center px-4 py-2 primary text-white font-semibold rounded-md hover:bg-red-700 transition">
                                <span class="mr-2 text-lg">+</span> Add Menu
                            </button>
                        </Link>
                    </div>
                </div>
            ) : pathname === '/profile' ? (
                <Typography>
                    <div className="pt-10 pb-7">
                        <div className="max-w-3xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg">
                            <h1 className="text-2xl text-[#A40C0C] tes font-bold mb-4">Restaurant Profile</h1>
                            <UpdateRestaurantForm />
                        </div>
                    </div>
                </Typography>
            ) : null}
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
    const { window } = props;
    const [pathname, setPathname] = useState('/overview');

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: (
                    <a href="/" aria-label="Home">
                        <img src={fastXLogo} alt="MUI logo" />
                    </a>
                ),
                title: <span className="text-white font-bold">fastX</span>,
            }}
            router={router}
            theme={customTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <div>
                    <DemoPageContent pathname={pathname} />
                </div>
            </DashboardLayout>
        </AppProvider>
    );
}

DashboardLayoutBranding.propTypes = {
    window: PropTypes.func,
};

export default DashboardLayoutBranding;
