import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, NavLink, Outlet } from "react-router-dom";
// import NewRequest from '../components/new-request/NewRequest';
import Axios from "axios";
import {
  FiFileText,
  FiGlobe,
  FiHome,
  FiTool,
  FiUsers,
  FiAlertTriangle,
} from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuContact } from "react-icons/lu";

const TenantDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/tenantdashboard/overview`, {
      replace: true,
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="p-6 drop-shadow-lg bg-white">
        <NavLink
          to="/tenantdashboard/overview"
          className={`flex items-center gap-4 mb-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiHome />
          </span>{" "}
          Dashboard
        </NavLink>
        {/* <NavLink
          to="/tenantdashboard/payments"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <BsCreditCard />
          </span>{" "}
          Payments
        </NavLink> */}
        {/* 
        <NavLink
          to="/tenantdashboard/requests"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiTool />
          </span>{" "}
          Requests
        </NavLink> */}

        <NavLink
          to="/tenantdashboard/announcements"
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
          to="/tenantdashboard/documents"
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
          to="/tenantdashboard/contacts"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <LuContact />
          </span>{" "}
          Contacts
        </NavLink>

        <NavLink
          to="/tenantdashboard/community"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiGlobe />
          </span>{" "}
          Community
        </NavLink>

        <NavLink
          to="/tenantdashboard/violations"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiAlertTriangle />
          </span>{" "}
          Violations
        </NavLink>

        {/* <NavLink
          to="/tenantdashboard/account"
          className={`flex items-center gap-4 my-4 cursor-pointer hover:bg-gray-200 px-4 rounded-[6px] py-2 ${({
            isActive,
          }) => (isActive ? "active" : "inactive")}`}
        >
          <span className="text-[20px]">
            <FiUsers />
          </span>{" "}
          Account
        </NavLink> */}
      </div>

      <div className="w-full p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default TenantDashboard;
