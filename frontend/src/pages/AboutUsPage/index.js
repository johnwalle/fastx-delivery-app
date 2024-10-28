import React from 'react'

function AboutUsPage() {
    return (
        <div className=''>
            <div class="p-24">
                <div class="max-w-5xl mx-auto px-4">
                    {/* Title Section */}
                    <div class="text-center mb-8">
                        <h1 class="text-4xl font-bold text-red-700">About Us</h1>
                        <p class="text-white mt-2">Discover our journey and commitment to bringing delicious food to your door.</p>
                    </div>

                    {/* Introduction Section */}
                    <div class="mb-8">
                        <h2 class="text-2xl font-semibold text-red-600">Our Story</h2>
                        <p class="text-white mt-2">Founded with a passion for great food and a commitment to fast delivery, our mission is to connect you with the best local cuisine in your area. Whether it's a quick bite or a gourmet meal, we make sure every order brings a smile.</p>
                    </div>

                    {/* Mission & Values Section */}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 class="text-2xl font-semibold text-red-600">Our Mission</h2>
                            <p class="text-white mt-2">Delivering delicious, high-quality meals while supporting our local community and creating a positive experience for every customer.</p>
                        </div>
                        <div>
                            <h2 class="text-2xl font-semibold text-red-600">Our Values</h2>
                            <ul class="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Customer satisfaction</li>
                                <li>Quality and freshness</li>
                                <li>Supporting local businesses</li>
                                <li>Sustainable practices</li>
                            </ul>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div class="mb-8">
                        <h2 class="text-2xl font-semibold text-red-600">Meet the Team</h2>
                        <p class="text-white mt-2">Our dedicated team of chefs, delivery staff, and support team work together to bring you the best food experience possible.</p>
                    </div>

                    {/* Service Area Section */}
                    <div class="mb-8">
                        <h2 class="text-2xl font-semibold text-red-600">Our Reach</h2>
                        <p class="text-white mt-2">Currently delivering in <strong>New York City, Los Angeles, and Miami</strong>. We are expanding to new locations soon!</p>
                    </div>

                    {/* Customer Testimonials Section */}
                    <div class="mb-8">
                        <h2 class="text-2xl font-semibold text-red-600">What Our Customers Say</h2>
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-white p-4 rounded-lg shadow">
                                <p class="italic text-gray-700">"Quick, delicious, and fresh. I love the variety of options!"</p>
                                <p class="text-sm text-gray-500 mt-2">- Jane Doe</p>
                            </div>
                            <div class="bg-white p-4 rounded-lg shadow">
                                <p class="italic text-gray-700">"The best food delivery experience I've had. Highly recommend!"</p>
                                <p class="text-sm text-gray-500 mt-2">- John Smith</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact & CTA Section */}
                    <div class="text-center">
                        <h2 class="text-2xl font-semibold text-red-600 mb-4">Ready to Order?</h2>
                        <a href="/order" class="px-6 py-3 bg-red-700 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-300">Order Now</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AboutUsPage