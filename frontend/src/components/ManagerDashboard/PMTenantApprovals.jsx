import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import { sampleTenantReqs } from "../../Utils/SampleData.jsx";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
import { toast, Bounce } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
const ALL_PROPS_URL = "http://localhost:8080/api/v1/property/search?email=";
const ALL_REQS_URL =
  "http://localhost:8080/api/v1/tenantapplications/property/";
const APPROVE_TENANT_URL = "http://localhost:8080/api/v1/property/approve/";
const REJECT_TENANT_URL = "http://localhost:8080/api/v1/property/reject/";

const PMTenantRequests = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});

  const fetchAllPropsOfPM = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(`${ALL_PROPS_URL}${auth.email}${"&status=approved"}`, { headers })
      .then((res) => {
        console.log(res);
        console.log("all props from pm tenant approval", res.data.properties);
        setProperties(res.data.properties);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const fetchRequests = async () => {
    if (!selectedProperty) return;
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    const url = `${ALL_REQS_URL}${selectedProperty}`;
    await axios
      .get(url, { headers })
      .then((res) => {
        console.log(res);
        setRequests(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleApprove = async (request) => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .post(`${APPROVE_TENANT_URL}${request.email}`, {}, { headers })
      .then((res) => {
        console.log(res);
        toast.success("Tenant Approved", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error: Submit failure", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .finally(() => setIsLoading(false));
    fetchRequests();
  };

  const handleReject = async (request) => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .post(`${REJECT_TENANT_URL + request?.email}`, {}, { headers })
      .then((res) => {
        console.log(res);
        toast.success("Tenant Rejected", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error: Submit failure", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    document.getElementById("my_modal_3").showModal();
    // setShowDialog(true);
  };

  const handlePropClick = (propt) => {
    setSelectedProperty(propt);
    // setContProp(propt.propertyId);
    // setCurrTenant(propt.tenantId);
  };

  useEffect(() => {
    console.log(selectedProperty);
    fetchRequests();
  }, [selectedProperty]);

  useEffect(() => {
    fetchAllPropsOfPM();
  }, [auth, navigate]);

  return (
    <div>
      {isLoading ? (
        <div className="loadingCont flex text-center justify-items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-10 items-center p-4">
            <div className="flex justify-center align-center">
              <h1 className="text-2xl font-bold mb-10 ">
                Property Manager Tenant Requests
              </h1>
            </div>
            <div
              className="px-4 py-2 text-white cursor-pointer bg-slate-500 text-md "
              onClick={() => navigate("/approved-tenants")}
            >
              Approved Tenants
            </div>
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
                    {propt.propertyDescription}
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
          <div className="divide-y divide-gray-200 mt-12">
            {requests &&
              requests.map((request) => (
                <div
                  key={request.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div onClick={() => handleRequestClick(request)}>
                    <h2 className="text-lg font-semibold cursor-pointer">
                      {request.name}
                    </h2>
                    <p className="text-sm text-gray-600">{request.email}</p>
                  </div>
                  {/* Approve and Deny buttons */}
                  <div className="flex space-x-4">
                    <button
                      className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleApprove(request)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleReject(request)}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {/* Dialog for displaying request details */}
          {/* {showDialog && ( */}
          <dialog
            id="my_modal_3"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  // onClick={() => setShowDialog(false)}
                >
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg mb-6">Request Details</h3>
              {selectedRequest && (
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {selectedRequest.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Email: {selectedRequest.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone Number: {selectedRequest.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    DOB: {selectedRequest.dateOfBirth}
                  </p>
                  <p className="text-sm text-gray-600">
                    Desired Move In Date: {selectedRequest.desiredMoveInDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Occupants: {selectedRequest.numOccupants}
                  </p>
                  <p className="text-sm text-gray-600">
                    Application Date: {selectedRequest.numOccupants}
                  </p>
                </div>
              )}
            </div>
          </dialog>
          {/* )} */}
        </>
      )}
    </div>
  );
};

export default PMTenantRequests;
