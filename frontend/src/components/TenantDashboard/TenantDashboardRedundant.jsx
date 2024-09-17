import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NewRequest from "../components/new-request/NewRequest";
import Axios from "axios";
import { FiTool } from "react-icons/fi";

const TenantDashboard = () => {
  const navigate = useNavigate();

  const [requestsData, setRequestsData] = useState();
  const [announcementsData, setAnnouncementsData] = useState([
    {
      id: "d6e3",
      announcementMessage: "New announcements 1",
      announcementdate: "18/02/2024",
    },
    {
      id: "d6e4",
      announcementMessage: "New announcements 2",
      announcementdate: "06/02/2024",
    },
    {
      id: "d6e6",
      announcementMessage: "New announcements 3",
      announcementdate: "10/01/2024",
    },
    {
      id: "d6e7",
      announcementMessage: "New announcements 4",
      announcementdate: "10/01/2024",
    },
  ]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const result = await Axios.get("http://localhost:8000/request");
    setRequestsData(result.data);
  };

  const loadAnnouncements = async () => {
    const result = await Axios.get("http://localhost:8000/announcements");
    setAnnouncementsData(result.data);
  };

  console.log(requestsData, "requestsData");

  return (
    <div className="flex min-h-screen">
      <div className="">
        <NavLink
          to="/dashboard"
          className={`flex items-center gap-4 my-4  cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiHome />
          </span>{" "}
          Dashboard
        </NavLink>
        <NavLink
          to="/payments"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <BsCreditCard />
          </span>{" "}
          Payments
        </NavLink>

        <NavLink
          to="/requests"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiTool />
          </span>{" "}
          Requests
        </NavLink>

        <NavLink
          to="/announcements"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <HiOutlineSpeakerphone />
          </span>{" "}
          Announcements
        </NavLink>

        <NavLink
          to="/documents"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiFileText />
          </span>{" "}
          Documents
        </NavLink>

        <NavLink
          to="/contacts"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiUsers />
          </span>{" "}
          Contacts
        </NavLink>

        <NavLink
          to="/community"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiGlobe />
          </span>{" "}
          Community
        </NavLink>
      </div>

      <div></div>
      <Outlet />
    </div>
  );
};

export default TenantDashboard;
