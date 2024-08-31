import { useState } from 'react';
import styles from './styles.module.css';
import { motion } from 'framer-motion';
import burgerbliss from '../AllRestaurantsPage/assets/burger-bliss.png';
import star from '../AllRestaurantsPage/assets/star.png';
import { Link } from 'react-router-dom';


const LandingPage = () => {

    const [faqs, setFaqs] = useState([
        { id: 1, question: 'Expanding to New Markets', answer: 'We are committed to bringing the fastX experience to more cities, making our seamless food delivery service accessible to a wider audience.', isOpen: false },
        {
            id: 2, question: 'Enhanced Features', answer: (
                <ul className="list-disc pl-5">
                    <li>Integrating loyalty programs</li>
                    <li className='pt-3'>Introducing subscription-based models</li>
                    <li className='pt-3'>Expanding payment options</li>
                </ul>
            ), isOpen: false
        },
        { id: 3, question: 'Sustainability Initiatives', answer: 'We are exploring eco-friendly delivery methods and packaging solutions to reduce our environmental impact and contribute to a greener future..', isOpen: false },
    ]);




    const toggleFAQ = (id) => {
        setFaqs((prevFaqs) => {
            const updatedFaqs = prevFaqs.map((faq) =>
                faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
            );
            return updatedFaqs;
        });
    };


    const restaurants = [
        { name: "The Spicy Spoon", rating: 4.5, cuisine: ["Indian", "Thai"] },
        { name: "Pasta Paradise", rating: 4.7, cuisine: ["Italian", "Mediterranean"] },
        { name: "Sushi Supreme", rating: 4.8, cuisine: ["Japanese"] },
    ];


    return (
        <div className='pt-14'>
            <div className="container mx-auto px-4 py-8 flex items-center justify-center">
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="md:text-left"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className={`${styles.heading}`}>
                            Discover the Fastest Way to Delicious Meals
                        </h1>
                        <p className='py-4'>
                            fastX - your gateway to a world of culinary delights, delivered swiftly to your doorstep.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center md:justify-start gap-2 my-6">
                            <motion.button
                                className='primary'
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Order Now
                            </motion.button>
                            <motion.button
                                className='secondary'
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Learn More
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex justify-center items-center h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.img
                            src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1200/https://cdn.gamma.app/sj7rrqpjfmldb6i/generated-images/NX51yHcY03DM3ue3l8Ace.png"
                            alt="Placeholder image"
                            className="w-full sm:w-3/4 md:w-1/2 lg:w-1/2 h-auto object-cover rounded-lg shadow-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        />
                    </motion.div>
                </motion.div>
            </div>



            {/* <motion.div
                className={`${styles.mission} p-10 mx-auto`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className='pb-5'
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Our Mission and Vision
                </motion.h2>
                <motion.div
                    className="flex flex-col lg:flex-row gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.div
                        className="flex-1 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">
                            Mission
                        </h3>
                        <p>
                            To revolutionize the way people experience food delivery, making it faster, more convenient, and seamlessly integrated into their daily lives.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex-1 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">
                            Vision
                        </h3>
                        <p>
                            To become the go-to app for food delivery, providing a delightful and efficient service that brings the best of local cuisines right to your fingertips.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div> */}
            <div className="bg-[#A40C0C] py-16 px-5">
                <motion.h2
                    className='pl-9 pb-4'
                    initial={{ opacity: 0, y: -20 }} // Initial state for heading animation
                    whileInView={{ opacity: 1, y: 0 }} // Animation when the heading comes into view
                    transition={{ duration: 1, ease: 'easeOut' }} // Smooth transition effect
                >
                    Featured Restaurants
                </motion.h2>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center gap-5 px-5">
                    {restaurants.map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-4 rounded-lg bg-white flex flex-col items-start shadow-md"
                            whileInView={{ opacity: 1, scale: 1 }} // Animation when the card comes into view
                            initial={{ opacity: 0, scale: 0.95 }} // Initial state before it comes into view
                            transition={{ duration: 2.5, ease: 'easeOut' }} // Smooth transition effect
                        >
                            <img
                                src={burgerbliss} // Replace with the actual restaurant image if available
                                alt={item.name}
                                className="h-[200px] w-full object-cover rounded-xl"
                            />
                            <div className="mt-2">
                                <Link to={'#'}>
                                    <h2 className="font-medium text-black text-xl hover:underline">{item.name}</h2>
                                </Link>
                                <div className="flex justify-start items-center mt-2">
                                    <img src={star} alt="Star" width={14} height={14} />
                                    <label className="text-gray-500 text-sm ml-2">{item.rating}</label>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {item.cuisine.map((cuisine, index) => (
                                        <span key={index} className="text-sm text-white px-2 py-1 bg-red-500 rounded-lg">
                                            {cuisine}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* <div className="bg-[#A40C0C] py-16 px-5">
                <h2 className='pl-9 pb-4'>Featured Restaurants</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center gap-5 px-5">
                    {restaurants.map((item, index) => (
                        <div key={index} className="p-4 rounded-lg bg-white flex flex-col items-start shadow-md">
                            <img
                                src={burgerbliss} // Replace with the actual restaurant image if available
                                alt={item.name}
                                className="h-[200px] w-full object-cover rounded-xl"
                            />
                            <div className='mt-2 '>
                                <Link to={'#'}><h2 className='font-medium text-black text-xl'>{item.name}</h2></Link>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2'>
                                        <img src={star}
                                            width={14}
                                            height={14} />
                                        <label className='text-gray-500 text-sm'>{item.rating}</label>
                                        {item.cuisine.map((cusine, index) => (
                                            <div key={index} className='text-sm text-white px-2 py-0 bg-red-500 rounded-lg'>{cusine}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}




            <div className="container mx-auto">
                <motion.div
                    className="flex flex-col lg:flex-row gap-8 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="flex-1 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Key Features of fastX</h2>
                        <div className={`${styles.numbered_list} space-y-4`}>
                            <motion.div
                                className={`${styles.feature_item}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3>Intuitive Interface</h3>
                                <p>A user-friendly app design that makes ordering a breeze.</p>
                            </motion.div>
                            <motion.div
                                className={`${styles.feature_item}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h3>Advanced Security</h3>
                                <p>Top-notch security features to keep your data safe.</p>
                            </motion.div>
                            <motion.div
                                className={`${styles.feature_item}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h3>Fast Performance</h3>
                                <p>Optimized for quick responses and high efficiency.</p>
                            </motion.div>
                            <motion.div
                                className={`${styles.feature_item}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h3>24/7 Support</h3>
                                <p>Round-the-clock customer service for all your needs.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1200/https://cdn.gamma.app/sj7rrqpjfmldb6i/generated-images/gpcZn_MU4_bPKehozumDM.png"
                            alt="Placeholder image"
                            className="w-full object-cover rounded-lg shadow-lg"
                        />
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="flex flex-col items-center py-20 px-4 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    How the fastX App Works
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 gap-4 w-full max-w-screen-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className={`${styles.border_shadow} text-center p-4 rounded-lg`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3>Search</h3>
                            <p>Browse the extensive menu and discover your desired dishes.</p>
                        </motion.div>

                        <motion.div
                            className={`${styles.border_shadow} text-center p-4 rounded-lg`}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3>Deliver</h3>
                            <p>Track your order in real-time and enjoy your meal fresh from the kitchen.</p>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className={`${styles.border_shadow} text-center p-4 rounded-lg`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3>Order</h3>
                        <p>Customize your order and seamlessly complete the transaction.</p>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className={`${styles.benefits_customer}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center"
                >
                    Benefits for Our Customers
                </motion.h1>

                <motion.div
                    className="inset-0 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-lg">
                        <motion.div
                            className="flex flex-col gap-4 w-full"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <motion.div
                                className="p-4 py-7 bg-[#A40C0C] border border-red-400 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h3 className="text-xl font-semibold">Convenience</h3>
                                <p>Order from the comfort of your home and have your food delivered with just a few taps.</p>
                            </motion.div>
                            <motion.div
                                className="p-4 py-7 bg-[#A40C0C] border border-red-400 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                <h3 className="text-xl font-semibold">Time-Saving</h3>
                                <p>Avoid the hassle of going out and waiting in lines, and enjoy your meal in no time.</p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col gap-4 w-full"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <motion.div
                                className="p-4 py-7 bg-[#A40C0C] border border-red-400 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h3 className="text-xl font-semibold">Variety</h3>
                                <p>Explore a wide range of cuisines and discover new favorite dishes.</p>
                            </motion.div>
                            <motion.div
                                className="p-4 py-7 bg-[#A40C0C] border border-red-400 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                <h3 className="text-xl font-semibold">Satisfaction</h3>
                                <p>Enjoy a seamless and delightful dining experience with every order.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>


            <motion.div
                className="container py-24 mx-auto p-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className='text-center py-9'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Partnerships and Collaborations
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.div
                        className="text-white p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="flex justify-center mb-2">
                            <img width="40" height="40" src="https://img.icons8.com/ultraviolet/40/restaurant.png" alt="restaurant" />
                        </div>
                        <h2 className="text-lg text-center">Local Restaurants</h2>
                        <p className="text-center">
                            We partner with a diverse network of local eateries to bring you the best of your neighborhood.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-white p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <div className="flex justify-center mb-2">
                            <img width="40" height="40" src="https://img.icons8.com/ultraviolet/40/delivery.png" alt="delivery" />
                        </div>
                        <h2 className="text-lg text-center">Reliable Delivery</h2>
                        <p className='text-center'>
                            Our efficient logistics network ensures your order reaches you swiftly and safely.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-white p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <div className="flex justify-center mb-2">
                            <img width="40" height="40" src="https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/external-Secure-Payments-business-smashingstocks-isometric-smashing-stocks.png" alt="secure payments" />
                        </div>
                        <h2 className="text-lg text-center">Secure Payments</h2>
                        <p className='text-center'>
                            Enjoy a seamless and secure payment experience with multiple options.
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-white p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        <div className="flex justify-center mb-2">
                            <img width="40" height="40" src="https://img.icons8.com/office/40/customer-support.png" alt="customer support" />
                        </div>
                        <h2 className="text-lg text-center">Dedicated Support</h2>
                        <p className='text-center'>
                            Our friendly customer service team is always available to assist you.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="bg-[#A40C0C] py-6 sm:p-8 md:p-12 lg:p-14"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container bg-[#A40C0C] sm:bg-[#210904]  py-24 mx-auto px-4">
                    <motion.h2
                        className='text-center pb-10'
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Competitive Advantages
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.div
                            className="text-white p-4 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="flex justify-center mb-2">
                                <img width="48" height="48" src="https://img.icons8.com/color/48/speed.png" alt="speed" />
                            </div>
                            <h3 className="text-lg text-center">Speed</h3>
                            <p className="text-center">
                                Our advanced logistics and efficient courier network ensure lightning-fast deliveries.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-white p-4 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <div className="flex justify-center mb-2">
                                <img width="48" height="48" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/50/external-variety-data-analytics-flaticons-lineal-color-flat-icons.png" alt="variety" />
                            </div>
                            <h3 className="text-lg text-center">Variety</h3>
                            <p className="text-center">
                                We offer an extensive selection of cuisines to cater to diverse tastes and preferences.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-white p-4 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            <div className="flex justify-center mb-2">
                                <img width="50" height="50" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/50/external-personalization-marketing-technology-flaticons-lineal-color-flat-icons-2.png" alt="personalization" />
                            </div>
                            <h3 className="text-lg text-center">Personalization</h3>
                            <p className="text-center">
                                Our app's intelligent recommendations make it easy to discover new favorite dishes.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>


            <motion.div
                className={`${styles.faq_top_container}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    id={`${styles.faq}`}
                    className={`${styles.faq_container}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h2
                        className='py-10'
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Future Plans and Roadmap
                    </motion.h2>

                    {faqs.map((faq) => (
                        <motion.div
                            key={faq.id}
                            className={`${styles.faq_item}`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <motion.div
                                className={`${styles.faq_header}`}
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <button
                                    className={`${styles.dropdown_button} ${faq.isOpen ? 'open' : ''}`}
                                    onClick={() => toggleFAQ(faq.id)}
                                >
                                    {faq.isOpen ? '▼' : '►'}
                                </button>
                                <h4 className="text-base sm:text-lg md:text-xl lg:text-xl">{faq.question}</h4>
                            </motion.div>

                            {faq.isOpen && (
                                <motion.p
                                    className={`${styles.answer}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    {faq.answer}
                                </motion.p>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>




        </div >
    )
}

export default LandingPage
