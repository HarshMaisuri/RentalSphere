import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../assets/LoadingSpinner";
import { IoIosArrowDown } from "react-icons/io";
import { MdFileDownload, MdOutlineDelete } from "react-icons/md";
import { sampleLeaseData } from "../../Utils/SampleData";
import useAppContext from "../../hooks/useAppContext.jsx";
const ALL_PROPS_URL = "http://localhost:8080/api/v1/property/rented/";
const ALL_LEASE_URL = "http://localhost:8080/api/v1/lease/property/";

export default function PMLeaseManage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { setContProp, setContTenant } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [currTenant, setCurrTenant] = useState("");
  const [leases, setLeases] = useState([]);
  const [currLease, setCurrLease] = useState({});

  const fetchAllProps = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(`${ALL_PROPS_URL}${auth.email}`, { headers })
      .then((res) => {
        console.log(res);
        console.log("all props from leaseManage", res.data.properties);
        setProperties(res.data.properties);
        console.log(res.data.properties[0].tenant);
        setContTenant(res.data.properties[0].tenant);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handlePropClick = (propt) => {
    setSelectedProperty(propt);
    // setContProp(propt);
  };

  const fetchLeases = async () => {
    if (!selectedProperty) return;
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    const url = `${ALL_LEASE_URL}${selectedProperty}`;
    await axios
      .get(url, { headers })
      .then((res) => {
        console.log(res);
        setLeases(res.data.leaseDetailsList);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleLeaseClick = (lease) => {
    setCurrLease(lease);
  };

  useEffect(() => {
    setCurrLease(leases[0]);
  }, [leases]);

  useEffect(() => {
    console.log(selectedProperty);
    fetchLeases();
    setContProp(selectedProperty);
  }, [selectedProperty]);

  useEffect(() => {
    fetchAllProps();
  }, [auth, navigate]);

  return (
    <div>
      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-10 items-center p-4">
            <h1 className="text-2xl font-bold">Lease Management</h1>
            <Link
              to="/managerdashboard/add-new-lease"
              className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add New Lease
            </Link>
          </div>

          <div className="relative">
            <label
              className="block pb-2 text-gray-12 text-[18px] font-semibold"
              htmlFor="type"
            >
              Select Property
            </label>
            <select
              name="type"
              aria-placeholder="Please Select a webhook type"
              className="cursor-pointer mt-2 appearance-none bg-gray w-full text-[16px] rounded-[4px] border-2 px-4 h-[52px] pr-8 focus:outline-none "
              onChange={(e) => handlePropClick(e.target.value)}
              value={selectedProperty}
            >
              <option className="bg-white text-black outline-none" value={0}>
                --Select Property--
              </option>
              {properties &&
                properties.length !== 0 &&
                properties?.map((propt, index) => (
                  <option
                    className="bg-white text-black outline-none"
                    value={propt.propertyId}
                    key={index}
                  >
                    {propt.propertyAddress}
                  </option>
                  // <option
                  //   className="bg-white text-black outline-none"
                  //   value="Property 1"
                  // >
                  //   Property 1
                  // </option>
                  // <option
                  //   className="bg-white text-black outline-none"
                  //   value="Property 2"
                  // >
                  //   Property 2
                  // </option>
                ))}
            </select>
            <span className="absolute top-[60%] right-[2%]">
              <IoIosArrowDown className="text-[#8D98AA] text-[20px]" />
            </span>
          </div>

          <h6 className="block pb-2 text-gray-12 text-[18px] font-semibold mt-8">
            Documents
          </h6>

          <div className="flex gap-10">
            <div className="w-[70%] mt-4">
              <div className="w-full">
                <table className="table-auto w-full h-full">
                  <thead className="text-left text-gray-4 uppercase text-[14px] tracking-wider">
                    <tr className="border-b-2 border-gray py-10">
                      <th className="pb-5 px-3">Lease Status</th>
                      <th className="pb-5 px-3">Start date</th>
                      <th className="pb-5 px-3">End date</th>
                      <th className="pb-5 px-3">Month rent</th>
                      <th className="pb-5 px-3 text-center">
                        {/* <MdFileDownload  className="text-green-900 text-center text-[20px]"/> */}
                        Download
                      </th>
                      <th className="pb-5 px-3 text-center">
                        Delete
                        {/* <MdOutlineDelete className="text-red-600 text-center text-[20px]"/> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-black font-gilroy-medium">
                    {leases &&
                      leases.map((data, index) => (
                        <tr
                          key={index}
                          className="border-b-2 border-gray py-10 cursor-pointer"
                          onClick={() => {
                            handleLeaseClick(data);
                          }}
                        >
                          <td className="py-4 px-3">{data.leaseStatus}</td>
                          <td className="py-4 px-3">{data.startDate}</td>
                          <td className="py-4 px-3">{data.endDate}</td>
                          <td className="py-4 px-3 text-center">
                            {data.monthlyRent}
                          </td>
                          <td className="py-4 px-3 ">
                            <a
                              className="flex justify-center"
                              href={data.leasePdfUrl}
                              target="_blank"
                            >
                              <MdFileDownload className="text-green-900 text-center text-[20px]" />
                            </a>
                          </td>
                          <td className="py-4 px-3 flex justify-center">
                            <a className="flex justify-center">
                              <MdOutlineDelete className="text-red-600 text-[20px]" />
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-[30%]">
              <div className="bg-white drop-shadow-md border border-gray-300 p-4">
                <h6 className="font-semibold text-[20px] text-gray-600">
                  Lease Information
                </h6>
                {currLease && currLease.leaseId ? (
                  <>
                    <div className="flex gap-4 items-center">
                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">First name</p>
                        <p className="text-[14px]">{currLease.firstName}</p>
                      </div>

                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">Last name </p>
                        <p className="text-[14px]">{currLease.lastName}</p>
                      </div>
                    </div>

                    <div className="w-full border-gray border-b pb-4">
                      <p className="mt-4 text-[18px]">DOB</p>
                      <p className="text-[14px]">{currLease.dateOfBirth}</p>
                    </div>

                    <div className="flex gap-4 flex-wrap items-center border-gray border-b pb-4">
                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">Email</p>
                        <p className="text-[14px]">{currLease.email}</p>
                      </div>

                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">Contact number</p>
                        <p className="text-[14px]">{currLease.phoneNumber}</p>
                      </div>

                      {/* <div className="w-[40%]">
                        <p className="mt-4 text-[18px]">Identification number</p>
                          <p className="text-[14px]">{}</p>
                      </div> */}
                    </div>

                    <div className="flex gap-4 ">
                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">Address</p>
                        <p className="text-[14px]">{currLease.streetAddress}</p>
                      </div>

                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">Occupants</p>
                        <p className="text-[14px]">{currLease.numOccupants}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">Start date</p>
                        <p className="text-[14px]">{currLease.startDate}</p>
                      </div>

                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">End date</p>
                        <p className="text-[14px]">{currLease.endDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="w-[50%]">
                        <p className="mt-4 text-[18px]">Rent</p>
                        <p className="text-[14px]">{currLease.monthlyRent}</p>
                      </div>

                      {/* <div className="w-[40%]">
                        <p className="mt-4 text-[18px]">Maintenance </p>
                        <p className="text-[14px]">$ 200</p>
                      </div> */}
                    </div>

                    {/* <div>
                      <p className="mt-4 text-[18px]">Deposite </p>
                      <p className="text-[14px]">$ 1000</p>
                    </div> */}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
