import { useEffect, useState } from "react";
import { LayoutDashboard, ShoppingCart, MapPin, User, LogOut, Menu } from "lucide-react";
import { motion } from "framer-motion";
import fastX_logo from '../../assets/fastX-logo.png';
import orderStore from "../../store/order.store";
import { Button, Popover } from "@mui/material";
import { PackageOpen, ShoppingBag } from "lucide-react";
import authStore from '../../store/auth.store';
import { useNavigate } from "react-router-dom";
import UserProfile from '../../components/userProfile';
import CustomerDashboard from "../../components/customer-dashboard";



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

export default function Dashboard() {
  const [active, setActive] = useState("My Orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { myOrders, getMyOrders } = orderStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null)

  const { userData } = authStore();
  const token = userData?.tokens?.access?.token || null;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    getMyOrders(token);
  }, [getMyOrders, token]);

  const formatDateToReadable = (isoDateString) => {
    const date = new Date(isoDateString);

    // Define the options for formatting the date
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    // Format the date to something like "Sep 8, 2024"
    return date.toLocaleDateString('en-US', options);
  };

  const handleClick = (event, order) => {
    console.log('ooooooooooooorder', order)
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null)

  };

  const menuItems = [
    // { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Orders", icon: ShoppingCart },
    { name: "Account Details", icon: User },
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
            setSidebarOpen(false); // Auto-close on mobile after selection
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

  {/* Main Content Area - Scrollable, flush against sidebar */}
  <div className="flex-1 md:ml-64 min-h-screen">
    <div className="p-6 md:p-10">
      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-red-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* My Orders Section */}
      {active === "My Orders" && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 md:mt-0"
        >
          <h2 className="text-3xl font-bold mb-3">{active}</h2>
          <p className="text-gray-300 mb-6">
            Here is your <span className="text-red-400">{active}</span> summary and recent activity.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {myOrders.length !== 0 ? (
              myOrders?.map((order, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white/5 backdrop-blur">
                  <h3 className="text-lg font-semibold">{order.restaurantName}</h3>
                  <p className="text-gray-400">Date: {formatDateToReadable(order.createdAt)}</p>
                  <p
                    className={`mt-1 font-medium ${
                      order.order_status === 'Delivered'
                        ? 'text-green-400'
                        : order.order_status === 'Canceled'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                    }`}
                  >
                    Status: {order.order_status}
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <Button
                      variant="contained"
                      onClick={(event) => handleClick(event, order)}
                    >
                      View Details
                    </Button>

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
                      {selectedOrder && (
                        <div className="p-4 min-w-[300px] bg-gray-900 text-white">
                          <h3 className="text-lg text-red-500 font-bold mb-4">Order Details</h3>
                          <div className="mb-4">
                            {selectedOrder.OrderItems.map((item, index) => (
                              <div key={index} className="flex justify-between py-2">
                                <span>{item.ItemName} ×{item.quantity}</span>
                                <span>{item.price} Birr</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between py-2 font-semibold text-red-400">
                            <span>Delivery Fee:</span>
                            <span>{selectedOrder.delivery_fee} Birr</span>
                          </div>
                          <div className="flex justify-between py-2 font-bold text-xl text-red-400">
                            <span>Total:</span>
                            <span>{selectedOrder.total_amount} Birr</span>
                          </div>
                        </div>
                      )}
                    </Popover>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center bg-[#220000]/50 backdrop-blur rounded-2xl border border-red-800 shadow-lg p-10 max-w-2xl mx-auto mt-20">
                <div className="bg-red-900/30 p-6 rounded-full mb-6">
                  <PackageOpen size={60} className="text-red-400" />
                </div>

                <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
                <p className="text-gray-400 mb-6 max-w-md">
                  Looks like you haven’t placed any orders yet. Explore delicious meals and order your first dish today!
                </p>

                <button
                  onClick={() => (window.location.href = "/restaurants")}
                  className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-6 py-3 rounded-full text-white font-medium transition-all shadow-lg"
                >
                  <ShoppingBag size={18} />
                  Order Now
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Account Details Section */}
      {active === "Account Details" &&
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <h2 className="text-3xl font-bold mb-3">{active}</h2>
            <p className="text-gray-300 mb-6">
              Here is your <span className="text-red-400">{active}</span> summary and recent activity.
            </p>

            <div className='pt-10 pb-7'>
              <div className="max-w-3xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl text-[#A40C0C] tes font-bold mb-4">Account Details</h1>
                <UserProfile />
              </div>
            </div>
          </motion.div>
        }
    </div>
  </div>
</div>
  );
}

