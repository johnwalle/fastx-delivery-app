import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ChevronDown, Utensils } from 'lucide-react';
import fastXLogo from '../../assets/fastX-logo.png';
import CreateRestaurantPage from '../CreateRestaurantPage';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from '@mui/material';


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

    return (
        <Box
            sx={{
                py: 4, px: 3
            }}
        >
            {pathname === '/order' ?
                <Typography>
                    <div className='border rounded-lg'>
                        {orders.map((order, index) => (
                            <Box>
                                <Accordion sx={{
                                    backgroundColor: 'transparent',
                                    color: 'white'
                                }} key={index}>
                                    <AccordionSummary
                                        expandIcon={<ChevronDown />}
                                        aria-controls='panel-content'
                                        id={order.id}>
                                        Order #{order.id}
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
                            </Box>
                        ))}
                        {/* <Accordion>
                            <AccordionSummary
                                expandIcon={<ChevronDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Accordion 1
                            </AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ChevronDown />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                Accordion 2
                            </AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded>
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
                        </Accordion> */}
                    </div>
                </Typography> :
                <Typography>
                    <CreateRestaurantPage />
                </Typography>}
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