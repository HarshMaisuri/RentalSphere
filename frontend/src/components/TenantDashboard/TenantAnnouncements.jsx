import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import { sampleTenantAnnouncements } from "../../Utils/SampleData.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
const ANNOUNCEMENTS_URL = "http://localhost:8080/api/v1/announcements/tenant/";

const TenantAnnouncements = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [announcementsData, setAnnouncementsData] = useState([sampleTenantAnnouncements]);
  const [announcements, setAnnouncements] = useState([]);
  const { contTenantEmail } = useAppContext();

  const fetchAllAnnouncements = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    const url = `${ANNOUNCEMENTS_URL}${auth.email}`;
    await axios
      .get(url, { headers })
      .then((res) => {
        console.log(res);
        console.log("all announcements for tenant: ", res.data);
        setAnnouncements(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAllAnnouncements();
  }, [auth, navigate]);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[22px]">Announcements</h1>
      </div>

      {isLoading ? (
        <div className="loadingCont flex text-center justify-items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : announcements && announcements.length !== 0 ? (
        announcements.map((data, index) => (
          // <div className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]">
          // <input type="checkbox" />
          // <div className="collapse-title text-[16px] font-semibold">
          //     Click me to show/hide content
          // </div>
          // <div className="collapse-content bg-white">
          //     <p className='text-[16px] mt-4'>hello</p>
          // </div>
          // </div>
          <div
            className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]"
            key={index}
          >
            <input type="checkbox" />
            <div className="collapse-title text-[16px] font-semibold">
              <div className="flex justify-between items-center">
                <p className="text-[20px]">{data.title}</p>
                <div className="bg-white rounded-full px-8 py-2">
                  {data.announcementDate.slice(0, 10)}
                </div>
              </div>
            </div>
            <div className="collapse-content  bg-white">
              <div className="flex justify-between items-center mt-4">
                <p className="text-[20px]">{data.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]">
          <div className="flex justify-between items-center p-4">
            <p className="text-[20px]">No Announcements at the moment</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TenantAnnouncements;
