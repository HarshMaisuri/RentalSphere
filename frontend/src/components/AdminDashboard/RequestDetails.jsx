import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequestDetails = () => {
  const { contReq } = useAuth();
  const navigate = useNavigate();
  let { id } = useParams();
  const [currReq, setCurrReq] = useState({});

  // const [propertyManagerReq, setPropertyManagerReq] = useState([]);
  // useEffect(() => {
  //   loadPropertyManagerReq();
  // }, []);

  useEffect(() => {
    if (contReq && contReq.email) {
      setCurrReq();
    }
  }, [contReq]);

  const loadPropertyManagerReq = async () => {
    const result = await Axios.get(
      `http://localhost:8000/property-managers/${id}`
    );
    setPropertyManagerReq(result.data);
  };

  const handleApprove = async (id) => {
    try {
      await Axios.patch(`http://localhost:8000/property-managers/${id}`, {
        verified: true,
      });
      alert("Form submitted successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="flex flex-col items-center p-6">
          <div className="mb-4">ID: {propertyManagerReq?.id}</div>
          <div className="mb-4">
            First Name: {propertyManagerReq?.firstName}
          </div>
          <div className="mb-4">Last Name: {propertyManagerReq?.lastName}</div>
          <div className="mb-4">Email: {propertyManagerReq?.email}</div>
          <div className="mb-4">
            Phone Number: {propertyManagerReq?.phoneNumber}
          </div>
          <div className="mb-4">City: {propertyManagerReq?.city}</div>
          <div className="mb-4">
            Image:
            {propertyManagerReq?.signature && (
              <img
                className="h-48 w-48 mb-4"
                src={propertyManagerReq?.signature}
                alt=""
              />
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleApprove(propertyManagerReq?.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleCancel(propertyManagerReq?.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
