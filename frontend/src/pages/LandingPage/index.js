import styles from './styles.module.css';

const LandingPage = () => {
    return (
        <div>

            <div className="container mx-auto px-4 py-8 flex items-center justify-center">
                <div class="flex flex-col md:flex-row items-center gap-4">

                    <div className="md:text-left">

                        <h1 className={`${styles.heading}`}>
                            Discover the Fastest Way to Delicious Meals
                        </h1>
                        <p className='py-4'>fastX - your gateway to a world of culinary delights, delivered swiftly to your doorstep.</p>

                        <div className="flex flex-col md:flex-row justify-center md:justify-start gap-2 my-6">
                            <button className='primary'>Order Now</button>
                            <button className='secondary'>Learn More</button>
                        </div>
                    </div>



                    <div class="flex justify-center items-center h-full">
                        <img
                            src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1200/https://cdn.gamma.app/sj7rrqpjfmldb6i/generated-images/NX51yHcY03DM3ue3l8Ace.png"
                            alt="Placeholder image"
                            className="w-full sm:w-3/4 md:w-1/2 lg:w-1/2 h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>


                </div>
            </div>


            <div className={`${styles.mission} p-10 mx-auto`}>
                <h2 className='pb-5'>Our Mission and Vision</h2>
                <div class="flex flex-col lg:flex-row gap-6">
                    <div class="flex-1 p-6 rounded-lg shadow-lg">
                        <h3 class="text-2xl font-bold mb-4 text-center lg:text-left">Mission</h3>
                        <p>To revolutionize the way people experience food delivery, making it faster, more convenient, and seamlessly integrated into their daily lives.</p>
                    </div>

                    <div class="flex-1 p-6 rounded-lg shadow-lg">
                        <h3 class="text-2xl font-bold mb-4 text-center lg:text-left">Vision</h3>
                        <p>To become the go-to app for food delivery, providing a delightful and efficient service that brings the best of local cuisines right to your fingertips.</p>
                    </div>
                </div>
            </div>


            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 items-center">

                    <div className="flex-1 p-6 rounded-lg shadow-lg">
                        <h2>Key Features of fastX</h2>
                        <div className={`${styles.numbered_list} space-y-4`}>
                            <div className={`${styles.feature_item}`}>
                                <h3>Intuitive Interface</h3>
                                <p>A user-friendly app design that makes ordering a breeze.</p>
                            </div>
                            <div className={`${styles.feature_item}`}>
                                <h3>Advanced Security</h3>
                                <p>Top-notch security features to keep your data safe.</p>
                            </div>
                            <div className={`${styles.feature_item}`}>
                                <h3>Fast Performance</h3>
                                <p>Optimized for quick responses and high efficiency.</p>
                            </div>
                            <div className={`${styles.feature_item}`}>
                                <h3>24/7 Support</h3>
                                <p>Round-the-clock customer service for all your needs.</p>
                            </div>
                        </div>
                    </div>


                    <div class="flex-1">
                        <img
                            src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1200/https://cdn.gamma.app/sj7rrqpjfmldb6i/generated-images/gpcZn_MU4_bPKehozumDM.png"
                            alt="Placeholder image"
                            class="w-full  object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center py-20 px-4 space-y-4">
                <h2>How the fastX App Works</h2>
                <div className="grid grid-cols-1 gap-4 w-full max-w-screen-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

                        <div className={`${styles.border_shadow} text-center p-4 rounded-lg`}>
                            <h3>Search</h3>
                            <p>Browse the extensive menu and discover your desired dishes.</p>
                        </div>

                        <div className={`${styles.border_shadow} text-center p-4 rounded-lg`}>
                            <h3>Deliver</h3>
                            <p>Track your order in real-time and enjoy your meal fresh from the kitchen.</p>
                        </div>

                    </div>
                </div>
                <div className={`${styles.border_shadow} text-center p-4 rounded-lg`}>
                    <h3>Order</h3>
                    <p>Customize your order and seamlessly complete the transaction.</p>
                </div>
            </div>


            <div className={`${styles.benefits_customer}`}>
                <h1>Benefits for Our Customers</h1>
                <div class="inset-0 flex items-center justify-center p-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-lg">
                        <div class="flex flex-col gap-4 w-full">
                            <div class="p-4  py-7 bg-[#A40C0C] border border-red-400 rounded-lg shadow-lg">
                                <h3 class="text-xl font-semibold">Convenience</h3>
                                <p>Order from the comfort of your home and have your food delivered with just a few taps.</p>
                            </div>
                            <div class="p-4  py-7 bg-[#A40C0C] border border-red-400 rounded-lg shadow-lg">
                                <h3 class="text-xl font-semibold">Time-Saving</h3>
                                <p>Avoid the hassle of going out and waiting in lines, and enjoy your meal in no time.</p>
                            </div>
                        </div>
                        <div class="flex  flex-col gap-4 w-full">
                            <div class="p-4 py-7 bg-[#A40C0C] border border-red-400 rounded-lg shadow-lg">
                                <h3 class="text-xl font-semibold">Variety</h3>
                                <p>Explore a wide range of cuisines and discover new favorite dishes.</p>
                            </div>
                            <div class="p-4  py-7 bg-[#A40C0C] border border-red-400 rounded-lg shadow-lg">
                                <h3 class="text-xl font-semibold">Satisfaction</h3>
                                <p>Enjoy a seamless and delightful dining experience with every order.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default LandingPage
