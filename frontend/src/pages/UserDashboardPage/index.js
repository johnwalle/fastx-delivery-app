import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { MapPinHouse } from 'lucide-react';
import fastXLogo from '../../assets/fastX-logo.png'

const NAVIGATION = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Recent Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'address',
        title: 'Saved Address',
        icon: <MapPinHouse />
    },
    {
        segment: 'account',
        title: 'Account Details',
        icon: <AccountBoxIcon />
    }
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true, },
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
    return (
        <Box
            sx={{
                py: 4,
                px: 3
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // textAlign: 'center',
            }}
        >
            {pathname === '/dashboard' ? (<Typography><div>Dashboard content for dashboard</div></Typography>) :
                pathname == '/orders' ?
                    (<Typography>
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold">Recent Orders</h2>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {user.recentOrders.map((order, index) => (
                                    <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                                        <h3 className="text-lg font-semibold">{order.restaurant}</h3>
                                        <p className="text-gray-600">Date: {order.date}</p>
                                        <p
                                            className={`mt-1 ${order.status === 'Delivered'
                                                ? 'text-green-500'
                                                : order.status === 'Canceled'
                                                    ? 'text-red-500'
                                                    : 'text-yellow-500'
                                                }`}
                                        >
                                            Status: {order.status}
                                        </p>
                                        <div className="mt-4 flex space-x-4">
                                            <button className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600">
                                                View Details
                                            </button>
                                            <button className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600">
                                                Reorder
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Typography>) :
                    pathname == '/account' ? (
                        <Typography>
                            <div>
                                <h2 className="text-2xl font-semibold">Account Details</h2>
                                <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm">
                                    <p className="text-gray-600">
                                        <strong>Email:</strong> {user.accountDetails.email}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        <strong>Phone Number:</strong> {user.accountDetails.phoneNumber}
                                    </p>
                                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 mt-4">
                                        Edit Account Details
                                    </button>
                                </div>
                            </div>
                        </Typography>
                    ) : <div className="mb-8">
                        <h2 className="text-2xl font-semibold">Saved Addresses</h2>
                        <div className="mt-4">
                            {user.savedAddresses.map((address, index) => (
                                <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm mb-4">
                                    <h3 className="text-lg font-semibold">{address.label}</h3>
                                    <p className="text-gray-600">{address.address}</p>
                                    <button className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 mt-2">
                                        Edit Address
                                    </button>
                                </div>
                            ))}
                            <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">
                                Add New Address
                            </button>
                        </div>
                    </div>}
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
                logo: <img src={fastXLogo} alt="MUI logo" width={100} height={100} />,
                title: 'fastx delivery',
            }}
            router={router}
            theme={demoTheme}
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
