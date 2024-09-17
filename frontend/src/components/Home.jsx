import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAppContext from "../hooks/useAppContext.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { toast, Bounce } from "react-toastify";
import {
  BedIcon,
  // CarIcon,
  BathIcon,
  CondoIcon,
  PartFurnishIcon,
  SqFtIcon,
  SqFtRateIcon,
} from "../Utils/SVGObjs";
import { sampleListingsData } from "../Utils/SampleData.jsx";

const LISTINGS_URL = "http://localhost:8080/api/v1/property";

const Home = () => {
  // const [currListings, setCurrListings] = useState(sampleListingsData);
  const { listings, setListings, singleListing, setSingleListing } =
    useAppContext();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const fetchListings = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(LISTINGS_URL, { headers })
      .then((res) => setListings(res.data.properties))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!auth.email) {
      toast.error("Please Login first", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/login");
    } else {
      fetchListings();
    }
  }, [auth, navigate]);

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-4 p-10 m-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!isLoading &&
          listings?.map((listing, index) => (
            <div className="relative w-full mx-auto" key={index}>
              <Link
                to={`/home/${listing.propertyId}`}
                // target="_blank"
                // to={{ pathname: `/home/${listing.id}`, state: { from: listing } }}
                className="relative inline-block w-full transition-transform duration-300 ease-in-out transform hover:-translate-y-2"
                onClick={() => {
                  setSingleListing(listing);
                }}
              >
                <div className="p-4 bg-white rounded-lg shadow">
                  <div className="relative flex justify-center overflow-hidden rounded-lg h-52">
                    <div className="w-full transition-transform duration-500 ease-in-out transform hover:scale-110">
                      {/* <div className="absolute inset-0 bg-yellow-300 opacity-10"></div> ????? */}
                      {/* <div className="absolute inset-0" src="./src/assets/Img1.jpeg"></div> */}

                      <img src={listing.imageURLs[0]} alt="" className="" />
                    </div>

                    <div className="absolute bottom-0 flex justify-center mb-3">
                      <div className="flex px-4 py-1 space-x-5 overflow-hidden bg-white rounded-lg shadow">
                        <p className="flex items-center font-medium text-gray-800">
                          <BedIcon />
                          {listing.numBedrooms}
                        </p>
                        {/* 
                    <p className="flex items-center font-medium text-gray-800">
                      <CarIcon />2
                    </p> */}

                        <p className="flex items-center font-medium text-gray-800">
                          <BathIcon />
                          {listing.numBathrooms}
                        </p>
                      </div>
                    </div>

                    <span className="absolute top-0 left-0 z-10 inline-flex px-3 py-2 mt-3 ml-3 text-sm font-medium text-white bg-red-500 rounded-lg select-none">
                      Featured
                    </span>
                  </div>

                  <div className="mt-4">
                    <h2
                      className="text-base font-medium text-gray-800 md:text-lg line-clamp-1"
                      title="New York"
                    >
                      {listing.propertyDescription}
                    </h2>
                    <p
                      className="mt-2 text-sm text-gray-800 line-clamp-1"
                      title="New York, NY 10004, United States"
                    >
                      {listing.propertyAddress}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
                    <p className="inline-flex flex-col text-gray-800 xl:flex-row xl:items-center">
                      <CondoIcon />
                      <span className="mt-2 xl:mt-0">
                        {sampleListingsData[listing.propertyId - 1].listingType}
                      </span>
                    </p>
                    <p className="inline-flex flex-col text-gray-800 xl:flex-row xl:items-center">
                      <PartFurnishIcon />
                      <span className="mt-2 xl:mt-0">
                        {sampleListingsData[listing.propertyId - 1].furnishType}
                      </span>
                    </p>
                    <p className="inline-flex flex-col text-gray-800 xl:flex-row xl:items-center">
                      <SqFtIcon />
                      <span className="mt-2 xl:mt-0">
                        {sampleListingsData[listing.propertyId - 1].area}
                      </span>
                    </p>
                    <p className="inline-flex flex-col text-gray-800 xl:flex-row xl:items-center">
                      <SqFtRateIcon />
                      <span className="mt-2 xl:mt-0">
                        {listing.monthlyRent}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 mt-8">
                    <div className="flex items-center">
                      <div className="relative">
                        {/* <div className="w-6 h-6 bg-gray-200 rounded-full md:w-8 md:h-8"></div> */}
                        <span className="absolute top-0 right-0 inline-block w-3 h-3 rounded-full bg-primary-red"></span>
                      </div>

                      <p className="ml-2 text-gray-800 line-clamp-1">
                        {listing.contactEmail}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <p className="inline-block font-semibold leading-tight text-primary whitespace-nowrap rounded-xl">
                        <span className="text-sm uppercase">$</span>
                        <span className="text-lg">{listing.monthlyRent}</span>/m
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
