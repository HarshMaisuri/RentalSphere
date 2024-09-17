import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

    const navigate = useNavigate();

    return (
    <section className="md:h-screen md:pb-0 pb-10 bg-black flex justify-center items-center">
        <div className="container mx-auto">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <div className="px-6 md:px-0 md:w-1/2">
                    <div className="text-white">
                        <h1 className="md:text-4xl text-lg font-bold  mb-2 md:mb-6">Welcome to Rental Sphere, where every corner holds an adventure, and every space tells a story</h1>
                        <p className="md:text-lg text-gray-300 mb-2 md:mb-8">Explore limitless possibilities and discover your perfect rental oasis in our vibrant sphere of possibilities</p>
                        <button onClick={() => navigate(`/login`)} className="bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-600 font-semibold">Get Started</button>
                    </div>
                </div>
                <div className="px-6 md:px-0 md:w-1/2">
                    <div className="w-full h-[calc(100vh-100px)]">
                        <img src="img/trans.gif" alt="Banner" className="object-contain w-full h-full" /> 
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Banner;
    