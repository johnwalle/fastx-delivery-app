import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, createTheme, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ChartNoAxesGantt, ChevronDown, Pencil } from 'lucide-react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppProvider } from '@toolpad/core/AppProvider';
import fastXLogo from '../../assets/fastX-logo.png';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import UpdateRestaurantForm from '../../components/updateRestaurantForm';






const NAVIGATION = [
    {
        segment: 'overview',
        title: 'Overview',
        icon: <ChartNoAxesGantt />,
    },
    {
        segment: 'orders',
        title: 'Orders Managment',
        icon: <ShoppingCartIcon />,
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
            default: '#F9F9FE', // Light background
            paper: '#A40C0C',   // Paper color for light theme
        },
        text: {
            primary: '#000000',  // Primary text color for light mode
            secondary: '#555555', // Secondary text color for light mode
        },
        action: {
            active: '#ffffff',   // Default icon color (black for light mode)
            hover: '#a72828',    // Icon color on hover (lighter gray)
            selected: '#FF6347', // Icon color when selected (e.g., a red-orange like Tomato color)
            disabled: '#BDBDBD', // Disabled icon color (gray)
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
    const user = {
        name: 'John Doe',
        recentOrders: [
            { restaurant: 'Pizza Palace', date: 'Sep 8, 2024', status: 'Delivered', orderId: '123456' },
            { restaurant: 'Burger Town', date: 'Sep 7, 2024', status: 'Preparing', orderId: '123457' },
            { restaurant: 'Sushi World', date: 'Sep 6, 2024', status: 'Canceled', orderId: '123458' },
        ],
        savedAddresses: [
            { address: '123 Main St, Springfield, IL', label: 'Home' },
            { address: '456 Oak Ave, Springfield, IL', label: 'Work' },
        ],
        accountDetails: {
            email: 'johndoe@example.com',
            phoneNumber: '123-456-7890',
        },
    };

    const orders = [
        {
            id: "001",
            date: "2024-10-04",
            items: [
                { name: "Pizza", quantity: 2, price: 20 },
                { name: "Pasta", quantity: 1, price: 15 },
            ],
            total: 55,
        },
        {
            id: "002",
            date: "2024-10-03",
            items: [
                { name: "Burger", quantity: 1, price: 10 },
                { name: "Fries", quantity: 1, price: 5 },
            ],
            total: 15,
        },
    ];

    const menuItems = [
        {
            id: 1,
            name: "Margherita Pizza",
            category: "Pizza",
            price: 12.99,
            description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
            available: true,
        },
        {
            id: 2,
            name: "BBQ Chicken Pizza",
            category: "Pizza",
            price: 14.99,
            description: "Grilled chicken, BBQ sauce, red onions, and cilantro.",
            available: true,
        },
        {
            id: 3,
            name: "Pepperoni Pizza",
            category: "Pizza",
            price: 13.99,
            description: "Mozzarella, pepperoni, and marinara sauce on a hand-tossed crust.",
            available: true,
        },
        {
            id: 4,
            name: "Spaghetti Bolognese",
            category: "Pasta",
            price: 11.99,
            description: "Spaghetti with a rich meat sauce and Parmesan cheese.",
            available: true,
        },
        {
            id: 5,
            name: "Fettuccine Alfredo",
            category: "Pasta",
            price: 12.49,
            description: "Creamy Alfredo sauce served over fettuccine noodles with garlic bread.",
            available: true,
        },
        {
            id: 6,
            name: "Caesar Salad",
            category: "Salad",
            price: 9.99,
            description: "Romaine lettuce, croutons, Parmesan, and Caesar dressing.",
            available: true,
        },
        {
            id: 7,
            name: "Greek Salad",
            category: "Salad",
            price: 8.99,
            description: "Mixed greens, tomatoes, cucumbers, olives, feta cheese, and Greek dressing.",
            available: true,
        },
    ];


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
                    </div>
                </Typography>
            ) : pathname === '/orders' ? (
                <Typography>
                    <div className='border rounded-lg'>
                        {orders.map((order, index) => (
                            <Accordion sx={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', border: 'none' }}>
                                <AccordionSummary
                                    expandIcon={<ChevronDown />}
                                    aria-controls="panel1-content"
                                    id="panel1-header">
                                    Order {order.id} - Preparing
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="bg-[#260904] p-4 text-white">
                                        <h4 className="text-lg font-semibold mb-4">Items</h4>
                                        <ul className="space-y-4">
                                            {order.items.map((item, index) => (
                                                <li key={index} className="bg-[#3b1f1b] p-4 rounded-lg shadow-md flex justify-between items-center">
                                                    <div>
                                                        <h5 className="text-md font-semibold">{item.name}</h5>
                                                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-md font-semibold">${item.price}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 flex justify-between">
                                            <span className="font-semibold">Total:</span>
                                            <span className="font-semibold">${order.total}</span>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                        <Accordion sx={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', border: 'none' }}>
                            <AccordionSummary
                                expandIcon={<ChevronDown />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                Accordion Actions
                            </AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </AccordionDetails>
                            <AccordionActions>
                                <Button>Cancel</Button>
                                <Button>Agree</Button>
                            </AccordionActions>
                        </Accordion>
                    </div>
                </Typography>
            ) : pathname === '/profile' ? (
                <Typography>
                    <div className='pt-10 pb-7'>
                        <div className="max-w-3xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg">
                            <h1 className="text-2xl text-[#A40C0C] tes font-bold mb-4">Restaurant Profile</h1>
                            <UpdateRestaurantForm />
                        </div>
                    </div>
                </Typography>
            ) : (
                <div className='border rounded-lg'>
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
                                {menuItems.map((menu) => (
                                    <TableRow
                                        key={menu.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ color: 'white' }} component="th" scope="row">
                                            {menu.name}
                                        </TableCell>
                                        <TableCell sx={{ color: 'white' }} align="right">
                                            <Link className='text-white' to={'/update-menu'}>
                                                <button className='bg-green-500 py-0 round-md '>
                                                    Update
                                                </button>
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={{ color: 'white' }} align="right">
                                            <button className='primary py-0'>
                                                Delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )
            }
        </Box >
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
    const { window } = props;

    const [pathname, setPathname] = React.useState('/overview');

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
                // Make the logo a clickable link to the landing page
                logo: (
                    <a href="/" aria-label="Home">
                        <img src={fastXLogo} alt="MUI logo" />
                    </a>
                ),
                // Change the color of the title
                title: <span className="text-white font-bold">fastX</span>,
            }}
            router={router}
            theme={customTheme} // Single color background theme
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
