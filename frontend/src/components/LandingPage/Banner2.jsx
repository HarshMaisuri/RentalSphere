
import React from 'react';

const Banner2 = () => {
    return (
        <div>
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">Premier Rental Solutions for Your Needs</h2>
                        <h5 className="text-lg text-gray-600">Offering Secure Rental Solutions </h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="bg-white shadow-md p-8">
                            <h3 className="text-xl font-semibold">Trusted Services</h3>
                            <p className="text-gray-700">Now search for rental spaces hassle free with RentalSphere.
                                At RentalSphere we assure authentic property listings.
                            </p>
                            {/* <button className="bg-gray-800 text-white py-2 px-4 mt-4 rounded-full hover:bg-gray-600 font-semibold">View more</button> */}
                        </div>
                        <div className="bg-white shadow-md p-8">
                            <h3 className="text-xl font-semibold">24/7 Support</h3>
                            <p className="text-gray-700">With our dedicated team we make sure that our every client’s needs are catered at any point of time.
                            </p>
                            {/* <button className="bg-gray-800 text-white py-2 px-4 mt-4 rounded-full hover:bg-gray-600 font-semibold">View more</button> */}
                        </div>
                        <div className="bg-white shadow-md p-8">
                            <h3 className="text-xl font-semibold">Expert & Professional</h3>
                            <p className="text-gray-700">Whether you manage a single building or a portfolio of properties, RentalSphere is for everyone.
                            </p>
                            {/* <button className="bg-gray-800 text-white py-2 px-4 mt-4 rounded-full hover:bg-gray-600 font-semibold">View more</button> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-200 py-8">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="pr-8">
                                <h5 className="text-lg text-gray-700">Why Choose US ?</h5>
                                <h2 className="text-3xl font-semibold mt-2">Advantages to be with US</h2>
                                <p className="text-gray-700 mt-4">At RentalSphere, we understand the challenges faced when searching for the perfect rental space. Join us in making the rental searching process smoother than ever before.
                                </p>
                            </div>
                            <div className="">
                                <div className="flex flex-col sm:flex-row justify-between">
                                    <div className="md:w-1/2">
                                        <p className="bg-white shadow-md p-4 rounded-md border-l-2 border-gray-700 mt-4 transition-all hover:bg-gray-700 hover:text-white">Tenant Screening
                                        </p>
                                        <p className="bg-white shadow-md p-4 rounded-md border-l-2 border-gray-700 mt-4 transition-all hover:bg-gray-700 hover:text-white">Complaint Management
                                        </p>
                                        <p className="bg-white shadow-md p-4 rounded-md border-l-2 border-gray-700 mt-4 transition-all hover:bg-gray-700 hover:text-white">Marketplace
                                        </p>
                                    </div>
                                    <div className="md:w-1/2 pl-2">
                                        <p className="bg-white shadow-md p-4 rounded-md border-l-2 border-gray-700 mt-4 transition-all hover:bg-gray-700 hover:text-white">Maintenance Contact Center
                                        </p>
                                        <p className="bg-white shadow-md p-4 rounded-md border-l-2 border-gray-700 mt-4 transition-all hover:bg-gray-700 hover:text-white">Rent Management
                                        </p>
                                        <p className="bg-white shadow-md p-4 rounded-md border-l-2 border-gray-700 mt-4 transition-all hover:bg-gray-700 hover:text-white">Lease Management</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 hidden md:block ml-12">
                            <img src="/img/whywe.gif" alt="Why Choose Us" className="w-full h-auto " />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner2;





