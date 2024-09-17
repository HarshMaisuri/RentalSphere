import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantAccount = () => {
  const [announcementsData, setAnnouncementsData] = useState([
    {
      id: "d6e3",
      announcementMessage: "New announcements 1",
      announcementdate: "18/02/2024",
      announcementDetails:"announcementDetailsannouncementDetails"
    },
    {
      id: "d6e4",
      announcementMessage: "New announcements 2",
      announcementdate: "06/02/2024",
      announcementDetails:"announcementDetailsannouncementDetails"
    },
    {
      id: "d6e6",
      announcementMessage: "New announcements 3",
      announcementdate: "10/01/2024",
      announcementDetails:"announcementDetailsannouncementDetails"
    },
    {
      id: "d6e7",
      announcementMessage: "New announcements 4",
      announcementdate: "10/01/2024",
      announcementDetails:"announcementDetailsannouncementDetails"
    },
  ]);

  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[22px]">Account setting</h1>
      </div>

    </>
  );
};

export default TenantAccount;
