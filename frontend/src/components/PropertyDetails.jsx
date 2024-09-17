import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import { sampleListingsData } from "../Utils/SampleData";
import LoadingSpinner from "../assets/LoadingSpinner.jsx";
import useAuth from "../hooks/useAuth.jsx";
// Icons
import { PiMapPin, PiBathtubBold } from "react-icons/pi";
import { BiHotel, BiBuildingHouse } from "react-icons/bi";
import CarouselSlider from "./carousel/CarouselSlider";
import { GiElectric } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdPets } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { LuSofa } from "react-icons/lu";
import { GiWashingMachine } from "react-icons/gi";
import { IoSnow } from "react-icons/io5";
import { PiPottedPlant } from "react-icons/pi";
import { LuCigarette } from "react-icons/lu";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { singleListing, setSingleListing } = useAppContext({});

  // const data = sampleListingsData.find((obj) => obj.id == id);
  // console.log(data, "data");

  const fetchPropertyDetails = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(`http://localhost:8080/api/v1/property/${id}`, { headers })
      .then((res) => setSingleListing(res.data.property))
      .catch((err) => console.log(err))
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    if (!singleListing || singleListing.propertyId !== id) {
      fetchPropertyDetails();
    }
  }, [auth, navigate]);

  const handleApplyClick = () => {
    navigate(`/home/${id}/apply`);
  };

  return (
    <div className="w-full p-10">
      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        singleListing &&
        singleListing.propertyId && (
          <div className="flex justify-center gap-6 ml-12">
            <div className="w-[48%]">
              <CarouselSlider>
                {singleListing &&
                  singleListing.imageURLs &&
                  singleListing.imageURLs.map((imgURL, index) => (
                    <div className="h-full w-full">
                      <img className="object-cover" src={imgURL} key={index} />
                    </div>
                  ))}

                <div className="h-full w-full">
                  <img
                    className="object-cover"
                    src="https://media.designcafe.com/wp-content/uploads/2023/01/31151510/contemporary-interior-design-ideas-for-your-home.jpg"
                  />
                </div>
                <div className="h-full w-full">
                  <img
                    className="object-cover"
                    src="https://media.designcafe.com/wp-content/uploads/2020/07/23205856/home-interior-design-ideas.jpg"
                  />
                </div>
                <div className="h-full w-full">
                  <img
                    className="object-cover"
                    src="https://media.istockphoto.com/id/1449364000/photo/minimalist-style-tiny-room.jpg?s=612x612&w=0&k=20&c=uokTOpJl8Hoc4HGqJPicYjy8SBMwCEWkGLUhhvJYgTA="
                  />
                </div>
              </CarouselSlider>
              <div className="mt-6">
                {/* <div className="bg-white p-4 border border-gray-300 drop-shadow-sm">
                  <h6 className="text-center font-bold ">Request a viewing</h6>
                  <p className="text-center mt-4 text-gray-600">
                    Check out the rental property in person! Schedule time with
                    the landlord for a viewing.
                  </p>
                  <button className="bg-[#373373] w-full rounded-[4px] py-2 text-white font-semibold mt-6">
                    Request a viewing
                  </button>
                </div> */}

                <div className="bg-white p-4 border border-gray-300 mt-6 drop-shadow-sm">
                  <h6 className="text-center font-bold ">Contact User</h6>
                  <button className="bg-[#373373] w-full rounded-[4px] py-2 text-white font-semibold mt-6">
                    Send message
                  </button>
                </div>

                <div className="text-center">
                  <button
                    className="bg-[#373373] w-1/2  rounded-[4px] py-2 text-white font-semibold mt-6"
                    onClick={handleApplyClick}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[48%] justify-center">
              {/* ### TITLE BOX DIV START### */}
              <div className="bg-white p-4 border border-gray-300  drop-shadow-sm ">
                <div className="flex justify-between gap-6">
                  <h2 className="text-[20px] font-bold text-gray-800">
                    {singleListing.propertyDescription}
                  </h2>

                  <div className="text-right w-[25%]">
                    <p className="text-green-600 font-bold text-[20px]">
                      ${singleListing.monthlyRent}
                    </p>
                    <p className="text-gray-600 text-[12px]">
                      Some Utilities Included
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 my-6">
                  <PiMapPin className="text-[20px] mt-1" />
                  <div>
                    <p className="font-semibold ">Halifax, NS B3N 1P9</p>
                    <p className="text-gray-600 text-[14px]">
                      Posted 3 days ago
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-4 my-4">
                    <div className="flex gap-2 items-center border-black pr-4 border-r">
                      <BiBuildingHouse className="text-[20px]" />{" "}
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .listingType
                        }
                      </p>
                    </div>

                    <div className="flex gap-2 items-center border-black pr-4 border-r">
                      <BiHotel className="text-[20px]" />{" "}
                      <p className="text-[14px]">
                        Bedrooms: {singleListing.numBedrooms}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <PiBathtubBold className="text-[20px]" />{" "}
                      <p className="text-[14px]">
                        Bathrooms: {singleListing.numBathrooms}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="rounded-[4px] bg-[#F1454F] py-2 px-4 text-white text-[12px] font-bold">
                      FEATURED
                    </button>
                  </div>
                </div>
              </div>
              {/* ### TITLE BOX DIV END### */}

              {/* ### DESCRIPTION START ### */}
              <div className="bg-white  p-4 border border-gray-300 drop-shadow-sm  mt-6">
                <h6 className="text-[20px] text-[#373373]">Description</h6>
                <p className="mt-4 ">{singleListing.propertyDescription}</p>
              </div>
              {/* ### DESCRIPTION END ### */}

              {/* ### OVERVIEW 2 BOX LAYOUT START ### */}
              <div className="flex gap-4 mt-6">
                <div className="w-1/2 bg-white p-4 border border-gray-300 drop-shadow-sm">
                  <h2 className="text-[20px]  text-[#373373]">Overview</h2>
                  <div className="flex gap-2 mt-4">
                    <GiElectric className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Utilities Included</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.utils
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <FaWifi className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Wi-Fi and More</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.wifi
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <LuParkingCircle className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Parking Included</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.parking
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <FaClockRotateLeft className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Agreement Type</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.agreement
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <IoCalendarNumberOutline className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Move-In Date</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.moveInDate
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <MdPets className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Pet Friendly</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.petFriendly
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 bg-white p-4 border border-gray-300 drop-shadow-sm">
                  <h2 className="text-[20px]  text-[#373373]">The Unit</h2>
                  <div className="flex gap-2 mt-4">
                    <TbRulerMeasure className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Size (sqft)</p>
                      <p className="text-[14px]">
                        {sampleListingsData[singleListing.propertyId - 1].area}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <LuSofa className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Furnished</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .furnishType
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <GiWashingMachine className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Appliances</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.appliances
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <IoSnow className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Air Conditioning</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.airc
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <PiPottedPlant className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Personal Outdoor Space</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.outdoor
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <LuCigarette className="text-[20px] mt-1" />
                    <div>
                      <p className="font-semibold">Smoking Permitted</p>
                      <p className="text-[14px]">
                        {
                          sampleListingsData[singleListing.propertyId - 1]
                            .details.smoke
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ### OVERVIEW 2 BOX LAYOUT END ### */}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PropertyDetails;
