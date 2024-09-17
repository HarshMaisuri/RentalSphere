import React, { useState, useEffect } from "react";
import axios from "axios";
import { sampleAnnouncements } from "../../Utils/SampleData.jsx";
import { toast, Bounce } from "react-toastify";
import useAuth from "../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
const ALL_PROPS_URL = "http://localhost:8080/api/v1/property/search?email=";
const ANNOUNCEMENTS_URL = "http://localhost:8080/api/v1/announcements";
const UPD_ANN_URL = "http://localhost:8080/api/v1/announcements/";
const PROP_ANNOUNCEMENTS_URL =
  "http://localhost:8080/api/v1/announcements/property/";

const PMAnnouncements = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  // const [announcements, setAnnouncements] = useState(sampleAnnouncements);
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState({});

  const handleSubmit = () => {
    if (editMode) {
      handleUpdateAnnouncement();
    } else {
      handleCreateAnnouncement();
    }
    setTitle("");
    setContent("");
    setEditMode(false);
    setSelectedAnnouncement({});
  };

  const handleUpdateAnnouncement = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .put(
        `${UPD_ANN_URL}${selectedAnnouncement.id}`,
        {
          title: title,
          content: content,
          propertyId: selectedProperty,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        fetchAllAnnouncements();
        toast.success("Announcement Updated", {
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
        toast.error("Failure: Submit Failure", {
          position: "top-center",
          autoClose: 2000,
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
    document.getElementById("my_modal_3").close();
  };

  const handleCreateAnnouncement = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .post(
        ANNOUNCEMENTS_URL,
        {
          title: title,
          content: content,
          propertyId: selectedProperty,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        fetchAllAnnouncements();
        toast.success("Announcement Created", {
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
        toast.error("Failure: Submit Failure", {
          position: "top-center",
          autoClose: 2000,
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
    document.getElementById("my_modal_3").close();
  };

  const handleDeleteAnnouncement = async (annId) => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .delete(`${UPD_ANN_URL}${annId}`, { headers })
      .then((res) => {
        console.log(res);
        fetchAllAnnouncements();
        toast.success("Announcement Deleted", {
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
        toast.error("Failure: Submit Failure", {
          position: "top-center",
          autoClose: 2000,
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

  const handleEditAnnouncement = (announcement) => {
    setEditMode(true);
    setSelectedAnnouncement(announcement);
    setTitle(announcement.title);
    setContent(announcement.content);
    document.getElementById("my_modal_3").showModal();
  };

  const fetchAllAnnouncements = async () => {
    if (!selectedProperty) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    const url = `${PROP_ANNOUNCEMENTS_URL}${selectedProperty}`;
    await axios
      .get(url, { headers })
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const fetchAllProps = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(`${ALL_PROPS_URL}${auth.email}${"&status=approved"}`, { headers })
      .then((res) => {
        console.log(res);
        console.log("all props from Announcements", res.data.properties);
        setProperties(res.data.properties);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handlePropClick = (propt) => {
    console.log("Being runnn");
    setSelectedProperty(propt);
    fetchAllAnnouncements();
  };

  useEffect(() => {
    fetchAllProps();
  }, [auth, navigate]);

  useEffect(() => {
    console.log("Change in selectedProperty: ", selectedProperty);
    fetchAllAnnouncements();
  }, [selectedProperty]);

  return (
    <div>
      <div className="flex justify-between mb-10 items-center p-4">
        <h1 className="text-2xl font-bold">Property Manager Announcements</h1>
        <button
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Create Announcement
        </button>
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
        >
          <option className="bg-white text-black outline-none" value={0}>
            --Select Property--
          </option>
          {properties &&
            properties?.map((propt, index) => (
              <option
                className="bg-white text-black outline-none"
                value={propt.propertyId}
                key={index}
              >
                {propt.propertyDescription}
              </option>
            ))}
        </select>
        <span className="absolute top-[60%] right-[2%]">
          <IoIosArrowDown className="text-[#8D98AA] text-[20px]" />
        </span>
      </div>

      <div className="divide-y divide-gray-200 p-10">
        {isLoading ? (
          <div className="loadingCont flex justify-center items-center h-screen w-full">
            <LoadingSpinner />
          </div>
        ) : (
          announcements &&
          announcements?.map((announcement) => (
            <div key={announcement.id} className="py-4 relative">
              <h2 className="text-lg font-semibold">{announcement.title}</h2>
              <p className="text-sm text-gray-600">{announcement.content}</p>
              <p className="text-xs text-gray-400">
                {announcement.announcementDate.slice(0, 10)}
              </p>
              <button
                className="absolute right-0 top-0 mr-2 mt-2 btn btn-sm btn-ghost btn-circle"
                onClick={() => handleEditAnnouncement(announcement)}
              >
                <FiEdit />
              </button>
              <button
                className="absolute right-8 top-0 mr-2 mt-2 btn btn-sm btn-ghost btn-circle text-red-500"
                onClick={() => handleDeleteAnnouncement(announcement.id)}
              >
                <FiTrash />
              </button>
            </div>
          ))
        )}
      </div>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setTitle("");
                setContent("");
                setEditMode(false);
                setSelectedAnnouncement(null);
                document.getElementById("my_modal_3").close();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">
            {editMode ? "Edit Announcement" : "Create New Announcement"}
          </h3>

          <div className="modal-action flex flex-col justify-center ">
            <form method="dialog" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-4"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="input input-bordered input-primary w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-4"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  className="input input-bordered input-primary w-full h-40"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {editMode ? "Update Announcement" : "Create Announcement"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PMAnnouncements;
