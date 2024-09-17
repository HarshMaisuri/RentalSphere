import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantNewRequest = () => {
  const navigate = useNavigate();

  const [requestData, setRequestData] = useState({
    requestSubject: "",
    requestType: "",
    requestMessage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendNewRequest = async () => {
    try {
      const result = await Axios.post(
        "http://localhost:8000/request",
        requestData
      );
      console.log(result, "resultresult");

      if (result.status) {
        alert("New Request sent successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="bg-white drop-shadow-md rounded-[8px] p-6">
        <h3 className="font-semibold text-[22px]">Create new request</h3>

        <div className="flex flex-col gap-2 mt-10 ">
          <label htmlFor="" className="font-medium text-[16px]">
            Request subject
          </label>
          <input
            type="text"
            value={requestData.requestSubject}
            onChange={(e) => handleInputChange(e)}
            placeholder="Subject"
            name="requestSubject"
            className="input input-bordered w-full "
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="" className="font-medium text-[16px]">
            Request type
          </label>
          <input
            type="text"
            value={requestData.requestType}
            onChange={(e) => handleInputChange(e)}
            placeholder="Type"
            name="requestType"
            className="input input-bordered w-full "
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="" className="font-medium text-[16px]">
            Request date
          </label>
          <input
            type="date"
            value={requestData.requestType}
            onChange={(e) => handleInputChange(e)}
            placeholder="date"
            name="date"
            className="input input-bordered w-full "
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="" className="font-medium text-[16px]">
            Request message
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={requestData.requestMessage}
            onChange={(e) => handleInputChange(e)}
            name="requestMessage"
            placeholder="Message"
          ></textarea>
        </div>

        <button
          onClick={() => sendNewRequest()}
          className="bg-green-700 text-white tracking-wider rounded-full  mt-6 px-10 py-2"
        >
          Send request
        </button>
      </div>
    </>
  );
};

export default TenantNewRequest;
