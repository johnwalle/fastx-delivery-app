import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ChartNoAxesGantt, ChevronDown, Utensils } from 'lucide-react';
import fastXLogo from '../../assets/fastX-logo.png';
import CreateRestaurantPage from '../CreateRestaurantPage';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import useRestaurantStore from '../../store/restaurant.store';
import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import authStore from '../../store/auth.store';
import orderStore from '../../store/order.store';


const NAVIGATION = [
    {
        segment: 'order',
        title: 'Manage Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'restaurant',
        title: 'Add Restaurants',
        icon: <Utensils />,
    },
    {
        segment: 'manage',
        title: 'Manage Restaurant',
        icon: <ChartNoAxesGantt />
    }
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

const orders = [
    {
        id: '001',
        status: 'Placed',
    },
    {
        status: 'Placed',
    },
];

function DemoPageContent({ pathname }) {
    const [expanded, setExpanded] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = React.useState({});
    const [orderList, setOrderList] = React.useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = (id) => {
        const updatedOrders = orderList.map((order) =>
            order.id === id ? { ...order, status: selectedStatus[id] || order.status } : order
        );
        setOrderList(updatedOrders);
        // Optionally show a success message or notification
        console.log(`Order ${id} status updated to ${selectedStatus[id]}`);
    };


    // fetch the restaurants from the store

    const { restaurants, fetchRestaurants } = useRestaurantStore();

    useEffect(() => {
        fetchRestaurants();
    }, []);



    const [restaurantsState, setRestaurantsState] = React.useState(restaurants);

    useEffect(() => {
        setRestaurantsState(restaurants);
    }, [restaurants]);

    // getting the token from the store

    const { userData } = authStore();

    const token = userData.tokens?.access?.token;


    //delete restaurant 

    const deleteRestaurant = async (restaurantId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/restaurants/delete/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("delete-- response", response);

            if (response.status === 200) {
                const updatedRestaurants = restaurantsState.filter((restaurant) => restaurant._id !== restaurantId);
                setRestaurantsState(updatedRestaurants);

                console.log('Restaurant deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    // get all orders
    const { allOrders, getAllOrders } = orderStore();
    console.log("All Orders", allOrders)

    useEffect(() => {
        // Define a function to fetch orders
        const fetchOrders = () => {
            getAllOrders(token);
        };

        // Initial fetch when component mounts
        fetchOrders();

        // Set up interval to fetch orders every 5 seconds (5000 ms)
        const intervalId = setInterval(fetchOrders, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [token, getAllOrders]); // Adding dependencies to reinitialize if token or getAllOrders changes

    useEffect(() => {
        if (Array.isArray(allOrders)) {
            setOrderList(allOrders);
        }
    }, [allOrders]);

    const handleStatusChange = async (event, orderId) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/order/update/${orderId}`, {
                order_status: event.target.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const updatedOrders = allOrders.map((order) =>
                    order._id === orderId ? { ...order, order_status: event.target.value } : order
                );
                setOrderList(updatedOrders);
                console.log('order status updated successfully');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    function formatDateTime(createdAt) {
        const date = new Date(createdAt);

        const formattedDate = date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const formattedTime = date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return `${formattedDate} ${formattedTime}`;
    }


    return (
        <Box
            sx={{
                py: 4, px: 3
            }}
        >
            {pathname === '/order' ?
                (<Typography>
                    <div className='border rounded-lg'>
                        {orderList?.map((order, index) => (
                            <Accordion
                                expanded={expanded == 'panel' + order._id}
                                onChange={handleChange('panel' + order._id)}
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: 'white'
                                }} key={index}>
                                <AccordionSummary
                                    expandIcon={<ChevronDown />}
                                    aria-controls='panel-content'
                                    id={order.id}>
                                    <span className='pr-3'>Order</span> <span className='text-blue-500'>{formatDateTime(order.createdAt)}</span>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="mb-4 px-4">
                                        <Typography variant="h6" className="font-semibold">Name: {order.userName}</Typography>
                                        <Typography className="text-gray-400">Restaurant: {order.restaurantName}</Typography>
                                        <Typography className="text-gray-400">Phone: {order.phoneNumber}</Typography>
                                        {order.delivery_instructions.length > 0 && <Typography className='text-gray-400'>Description: {order.delivery_instructions}</Typography>}
                                        <Typography className='text-gray-400'>Payment Status: <span className='text-green-400'>{order.payment_status}</span></Typography>
                                    </div>
                                    <div className="p-4 min-w-[250px] flex flex-col">
                                        <h3 className="text-lg font-bold mb-4">Order Details</h3>
                                        <div className="mb-4">
                                            {order.OrderItems.map((item, index) => (
                                                <div key={index} className="flex justify-between py-2 text-white">
                                                    <span>{item.ItemName} X{item.quantity}</span>
                                                    <span>{item.price} Birr</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between py-2 font-semibold text-white">
                                            <span>Total Price:</span>
                                            <span>{order.total_amount} Birr</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <Typography variant="h6" sx={{ marginBottom: '10px' }}>Update Status:</Typography>
                                        <FormControl fullWidth className="mt-2">
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                sx={{ color: 'red' }}
                                                defaultValue={order.order_status}
                                                value={order.order_status}
                                                label="Status"
                                                onChange={(event) => handleStatusChange(event, order._id)}
                                            >
                                                <MenuItem value="Preparing">Preparing</MenuItem>
                                                <MenuItem value="On the Way">On the Way</MenuItem>
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                        ))}
                    </div>
                </Typography>) : pathname == '/restaurant' ?
                    (<Typography>
                        <CreateRestaurantPage />
                    </Typography>) :
                    (<Typography>
                        <div className='border rounded-lg'>
                            <TableContainer sx={{ backgroundColor: 'transparent' }} component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }}>Restaurant Names</TableCell>
                                            <TableCell sx={{ color: 'white' }} align="right"></TableCell>
                                            <TableCell sx={{ color: 'white' }} align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {restaurantsState.map((restaurant, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ color: 'white' }} component="th" scope="row">
                                                    {restaurant.name}
                                                </TableCell>
                                                <TableCell sx={{ color: 'white' }} align="right">
                                                    <Link className="text-white" to={`/update-restaurant/${restaurant._id}`}>
                                                        <button className="bg-green-500 py-0 round-md">Update</button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell sx={{ color: 'white' }} align="right">
                                                    <button
                                                        className="primary py-0"
                                                        onClick={() => deleteRestaurant(restaurant._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Typography>)}
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
    const { window } = props;

    const [pathname, setPathname] = React.useState('/dashboard');

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // preview-start
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
                <DemoPageContent pathname={pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

DashboardLayoutBranding.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default DashboardLayoutBranding;