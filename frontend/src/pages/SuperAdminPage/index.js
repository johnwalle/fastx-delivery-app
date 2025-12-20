import { useEffect, useState } from "react";
import { LogOut, Menu, Building2, Package, Store, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import fastX_logo from '../../assets/fastX-logo.png';
import orderStore from "../../store/order.store";
import authStore from '../../store/auth.store';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { ChevronDown, PackageOpen, Plus } from 'lucide-react';
import { Accordion, AccordionDetails, AccordionSummary, FormControl, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select } from '@mui/material';
import axios from "axios";
import CreateRestaurantPage from '../CreateRestaurantPage';
import useRestaurantStore from '../../store/restaurant.store';
import { Link } from 'react-router-dom';
import AddAdminUser from "../../components/add-admin";

function LogoutButton() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    authStore.getState().clearUserData();
    navigate("/");
  };

  return (
    <div className="p-4 border-t border-red-800">
          <button className="flex items-center gap-3 w-full px-4 py-2 bg-red-900 hover:bg-red-800 rounded-lg"
          onClick={logoutHandler}>
            <LogOut size={18} /> Logout
          </button>
        </div>
  );
}


function OrdersList({ orderList, expanded, handleChange, handleStatusChange, formatDateTime }) {
    return (
      <div className="border rounded-lg p-6 bg-gray-50 shadow-inner">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2 text-red-600">
          Orders List
        </h2>
  
        {/* Check if there are orders */}
        {Array.isArray(orderList) && orderList.length > 0 ? (
          orderList.map((order, index) => (
            <Accordion
              key={index}
              expanded={expanded === 'panel' + order._id}
              onChange={handleChange('panel' + order._id)}
              sx={{
                backgroundColor: 'white',
                color: '#111',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                marginBottom: '12px'
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown color="#dc2626" />}
                aria-controls="panel-content"
                id={order._id}
              >
                <span className="pr-3 font-semibold text-gray-800">Order</span>
                <span className="text-blue-500 font-medium">{formatDateTime(order.createdAt)}</span>
              </AccordionSummary>
  
              <AccordionDetails>
                <div className="mb-4 px-4">
                  <Typography variant="h6" className="font-semibold text-gray-800">
                    Name: {order.userName}
                  </Typography>
                  <Typography className="text-gray-600">
                    Restaurant: {order.restaurantName}
                  </Typography>
                  <Typography className="text-gray-600">
                    Phone: {order.phoneNumber}
                  </Typography>
                  {order.delivery_instructions?.length > 0 && (
                    <Typography className="text-gray-600">
                      Description: {order.delivery_instructions}
                    </Typography>
                  )}
                  <Typography className="text-gray-600">
                    Payment Status:{' '}
                    <span className="text-green-600 font-medium">{order.payment_status}</span>
                  </Typography>
                </div>
  
                <div className="p-4 min-w-[250px] flex flex-col bg-gray-100 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-red-600">Order Details</h3>
                  <div className="mb-4">
                    {order.OrderItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-2 text-gray-700">
                        <span>{item.ItemName} × {item.quantity}</span>
                        <span>{item.price} Birr</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between py-2 font-semibold text-gray-800">
                    <span>Total Price:</span>
                    <span>{order.total_amount} Birr</span>
                  </div>
                </div>
  
                <div className="mt-4">
                  <Typography variant="h6" sx={{ marginBottom: '10px' }} className="text-gray-800">
                    Update Status:
                  </Typography>
                  <FormControl fullWidth className="mt-2">
                    <InputLabel>Status</InputLabel>
                    <Select
                      sx={{ color: '#dc2626' }}
                      value={order.order_status}
                      label="Status"
                      onChange={(event) => handleStatusChange(event, order._id)}
                    >
                      <MenuItem sx={{color: '#dc2626'}} value="Preparing">Preparing</MenuItem>
                      <MenuItem sx={{color: '#dc2626'}} value="On the Way">On the Way</MenuItem>
                      <MenuItem sx={{color: '#dc2626'}} value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          // Empty state component
          <div className="flex flex-col items-center justify-center text-center bg-white text-gray-800 rounded-2xl border border-gray-300 shadow p-10 max-w-md mx-auto mt-10">
            <div className="bg-red-100 p-6 rounded-full mb-6">
              <PackageOpen size={60} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-red-600">No Orders Found</h2>
            <p className="text-gray-600 mb-6">
              There are no orders to display right now.  
              New orders will appear here once they are placed.
            </p>
          </div>
        )}
      </div>
    );
  }


  function RestaurantList({ restaurantsState, deleteRestaurant }) {
    return (
      <div className="border rounded-lg p-6 bg-gray-50 shadow-inner">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2 text-red-600">
          Restaurant List
        </h2>
  
        {/* Check if there are restaurants */}
        {Array.isArray(restaurantsState) && restaurantsState.length > 0 ? (
          <TableContainer sx={{ backgroundColor: 'white', borderRadius: '10px' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="restaurants table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                  <TableCell sx={{ color: '#111', fontWeight: 'bold' }}>Restaurant Name</TableCell>
                  <TableCell align="right" sx={{ color: '#111', fontWeight: 'bold' }}>Update</TableCell>
                  <TableCell align="right" sx={{ color: '#111', fontWeight: 'bold' }}>Delete</TableCell>
                </TableRow>
              </TableHead>
  
              <TableBody>
                {restaurantsState.map((restaurant, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f9fafb' },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ color: '#333' }}>
                      {restaurant.name}
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`/update-restaurant/${restaurant._id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md transition">
                          Update
                        </button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <button
                        onClick={() => deleteRestaurant(restaurant._id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md transition"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center text-center bg-white text-gray-800 rounded-2xl border border-gray-300 shadow p-10 max-w-md mx-auto mt-10">
            <div className="bg-red-100 p-6 rounded-full mb-6">
              <Building2 size={60} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-red-600">No Restaurants Found</h2>
            <p className="text-gray-600 mb-6">
              There are no restaurants added yet.  
              Add your first restaurant to get started!
            </p>
            <Link to="/add-restaurant">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition">
                Add Restaurant
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }


export default function Dashboard() {
  const [active, setActive] = useState("Manage Orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // getting the token from the store
  const { userData } = authStore();
  const token = userData?.tokens?.access?.token || null;
  

  // fetch the restaurants from the store
  const { restaurants, fetchRestaurants } = useRestaurantStore();
  useEffect(() => {
          fetchRestaurants();
      }, []);

  const [restaurantsState, setRestaurantsState] = useState(restaurants);
  useEffect(() => {
          setRestaurantsState(restaurants);
      }, [restaurants]);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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

  const menuItems = [
    { name: "Manage Orders", icon: Package },
    { name: "Add Restaurants", icon: Plus },
    { name: "Manage Restaurant", icon: Store },
    { name: "Add Admin", icon: UserPlus },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#330000] to-[#550000] text-white font-sans">
  {/* Sidebar - Fixed on desktop, overlay on mobile */}
  <div
    className={`${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
   } fixed inset-y-0 left-0 z-20 w-64 bg-[#a10000] flex flex-col transition-transform duration-300 md:translate-x-0`}
>
    <div className="flex items-center justify-between p-4 border-b border-red-800">
      <div className="flex items-center gap-2">
        <a href="/">
          <img
            src={fastX_logo}
            alt="fastX logo"
            className="w-32 h-auto md:w-40"
          />
        </a>
      </div>
      <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
        ✕
      </button>
    </div>

    <nav className="flex-1 mt-4 space-y-1 overflow-y-auto px-3">
      {menuItems.map(({ name, icon: Icon }) => (
        <motion.button
          key={name}
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-3 w-full px-5 py-3 text-left transition-all rounded-md ${
            active === name ? "bg-red-700 font-semibold" : "hover:bg-red-800"
          }`}
          onClick={() => {
            setActive(name);
            setSidebarOpen(false); // Optional: close sidebar on mobile after selection
          }}
        >
          <Icon size={20} />
          {name}
        </motion.button>
      ))}
    </nav>

    <div className="p-4 border-t border-red-800">
      <LogoutButton />
    </div>
  </div>

  {/* Main Content Area - Scrollable independently */}
  <div className="flex-1 md:ml-64 min-h-screen">
    <div className="p-6 md:p-10">
      {/* Mobile Hamburger Button */}
      {!sidebarOpen && (
        <button
        className="md:hidden fixed top-4 left-4 z-30 bg-red-800 p-2 rounded-md shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button> )}

      {/* Page Content */}
      {active === "Manage Orders" && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 md:mt-0"
        >
          <OrdersList
            orderList={orderList}
            expanded={expanded}
            handleChange={handleChange}
            handleStatusChange={handleStatusChange}
            formatDateTime={formatDateTime}
          />
        </motion.div>
      )}

      {active === "Add Restaurants" && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 md:mt-0"
        >
          <CreateRestaurantPage />
        </motion.div>
      )}

      {active === "Manage Restaurant" && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 md:mt-0"
        >
          <RestaurantList
            restaurantsState={restaurantsState}
            deleteRestaurant={deleteRestaurant}
          />
        </motion.div>
      )}

      {active === "Add Admin" && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 md:mt-0"
        >
          <AddAdminUser />
        </motion.div>
      )}
    </div>
  </div>
</div>
  );
}