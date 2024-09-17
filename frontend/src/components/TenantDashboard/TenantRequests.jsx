import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleRequestData } from "../../Utils/SampleData";

const TenantRequests = () => {
  const navigate = useNavigate();

  const [requestsData, setRequestsData] = useState(sampleRequestData);

  // useEffect(() => {
  //   loadRequests();
  // }, []);

  // const loadRequests = async () => {
  //   const result = await Axios.get("http://localhost:8000/request");
  //   setRequestsData(result.data);
  // };
  return (
    <>
      <div className="flex justify-between mb-8 items-center">
        <h1 className="font-bold text-[22px]">Requests</h1>
        <button
          onClick={() => navigate("/tenantdashboard/requests/new-request")}
          className="bg-green-700 text-white tracking-wider rounded-full px-10 py-3 self-start"
        >
          Create request
        </button>
      </div>

      {requestsData?.length === 0 ? (
        <div>No Data Found</div>
      ) : (
        requestsData &&
        requestsData.map((data, index) => (
          <>
            <div className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]">
              <input type="checkbox" />
              <div className="collapse-title text-[16px] font-semibold">
                <div className="flex justify-between items-center">
                  <p className="text-[20px]">{data.requestSubject}</p>

                  <div className="flex gap-4">
                    <div className="bg-white rounded-full px-8 py-2">
                      {data.date}
                    </div>

                    <div className="bg-white rounded-full px-8 py-2">
                      {data.requestType}
                  </div>
                  </div>
                </div>
              </div>
              <div className="collapse-content  bg-white">
                <div className="flex justify-between items-center mt-4">
                  <p className="text-[20px]">{data.requestMessage}</p>
                </div>
              </div>
            </div>
          </>
        ))
      )}
    </>
  );
};

export default TenantRequests;
