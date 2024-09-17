import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
import { propManagersData } from "../../Utils/sampleDataHarsh.jsx";
import useAppContext from "../../hooks/useAppContext.jsx";
const ALL_PMS_URL = "http://localhost:8080/api/v1/property";

const PropertyMangers = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [PMData, SetPMData] = useState([]);
  const { allPMReqs, setAllPMReqs } = useAppContext();
  const [approvedPMs, setApprovedPMs] = useState([]);

  // useEffect(() => {
  //   const filteredPropertyManagers = propManagersData.filter(
  //     (pm) => pm.verified === true
  //   );
  //   console.log(filteredPropertyManagers, "filteredPropertyManagers");
  //   SetPMData(filteredPropertyManagers);
  // }, []);

  // useEffect(() => {
  //   const filteredPropertyManagers = allPMReqs.filter(
  //     (pm) => pm.verified === true
  //   );
  //   console.log(filteredPropertyManagers, "filteredPropertyManagers");
  //   setApprovedPMs(filteredPropertyManagers);
  // }, [allPMReqs]);

  const fetchApprovedPMs = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(ALL_PMS_URL, { headers })
      .then((res) => {
        setApprovedPMs(res.data.properties);
        console.log("Data from /property", res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleViewPropDetailClick = (propt) => {
    // navigate(`/home/${propt.propertyId}`);
    const propertyDetailsUrl = `/home/${propt.propertyId}`;
    window.open(propertyDetailsUrl, "_blank");
  };

  useEffect(() => {
    fetchApprovedPMs();
  }, [navigate]);

  return (
    <>
      <div className="container py-6 flex justify-between items-center">
        <p className="text-2xl font-bold mb-4">AdminDashboard</p>
        <div
          className="bg-slate-500 text-white py-2 px-4 cursor-pointer text-md "
          onClick={() => navigate("/admin")}
        >
          View All Requests
        </div>
      </div>

      <div className="container mx-auto">
        <h1 className="text-xl font-bold mb-4 mt-10">
          Listed Property Manager
        </h1>
        <table className="table mt-10">
          <thead>
            <tr>
              {/* <th className="px-4 py-2">ID</th> */}
              <th className="px-4 py-2">Property ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Property Description</th>
              <th className="px-4 py-2">Image URL</th>
              <th className="px-4 py-2">View Property</th>
            </tr>
          </thead>

          {isLoading ? (
            <div className="loadingCont flex justify-center items-center h-screen w-full">
              <LoadingSpinner />
            </div>
          ) : approvedPMs && approvedPMs[0] ? (
            approvedPMs?.map((user) => (
              <tbody>
                <tr key={user.id}>
                  {/* <td className="border px-4 py-2">{user.id}</td> */}
                  <td className="border px-4 py-2">{user.propertyId}</td>
                  <td className="border px-4 py-2">{user.contactEmail}</td>
                  <td className="border px-4 py-2">{user.phoneNumber}</td>
                  <td className="border px-4 py-2">
                    {user.propertyDescription}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => window.open(user.imageURLs[0], "_blank")}
                      className="px-4 py-2 mr-2 font-bold text-white bg-black rounded"
                    >
                      View
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        handleViewPropDetailClick(user);
                      }}
                      className="px-4 py-2 mr-2 font-bold text-white bg-black rounded"
                    >
                      View
                    </button>
                  </td>
                  {/* <td className="border px-4 py-2">
                  <img
                    className="w-[150px] h-[100px]"
                    src={user?.signature}
                    alt=""
                  />
                </td> */}
                </tr>
              </tbody>
            ))
          ) : (
            <p>There are no Approved Property Managers at the moment</p>
          )}
        </table>
      </div>
    </>
  );
};

export default PropertyMangers;
