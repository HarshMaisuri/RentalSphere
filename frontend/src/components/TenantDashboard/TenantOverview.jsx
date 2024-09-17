import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../assets/LoadingSpinner";
import { toast, Bounce } from "react-toastify";
// import NewRequest from '../components/new-request/NewRequest';
import { FiTool } from "react-icons/fi";
import { sampleRequestData } from "../../Utils/SampleData";
const ANNOUNCEMENTS_URL = "http://localhost:8080/api/v1/announcements/tenant/";
const LEASE_URL = "http://localhost:8080/api/v1/lease/tenant/";
const POSTS_URL = "http://localhost:8080/api/v1/marketplace/post/tenant/";
const MKP_URL = "http://localhost:8080/api/v1/marketplace/post/";

function TenantOverview() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [currLease, setCurrLease] = useState({});
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const fetchAnnouncements = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(`${ANNOUNCEMENTS_URL}${auth.email}`, { headers })
      .then((res) => {
        console.log(res);
        console.log("all announcements for tenant: ", res.data);
        setAnnouncements(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const fetchLeaseInfo = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    const url = `${LEASE_URL}${auth.email}`;
    await axios
      .get(url, { headers })
      .then((res) => {
        console.log(res);
        console.log("lease for tenant: ", res.data);
        setCurrLease(res.data.lease);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const loadPosts = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(`${POSTS_URL}${auth.email}`, { headers })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("id", selectedPost.id);
    formDataToSend.append("title", title);
    formDataToSend.append("description", description);
    formDataToSend.append("price", price);
    formDataToSend.append("availabilityStatus", availabilityStatus);

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .put(MKP_URL, formDataToSend, { headers })
      .then((res) => {
        console.log(res);
        loadPosts();
        toast.success("Post Updated", {
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

  const handleEditPost = (post) => {
    setEditMode(true);
    setSelectedPost(post);
    setTitle(post.title);
    setDescription(post.description);
    setPrice(post.price);
    setAvailabilityStatus(post.availabilityStatus);
    document.getElementById("my_modal_3").showModal();
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchLeaseInfo();
    loadPosts();
  }, [auth, navigate]);

  return (
    <div>
      <h1 className="font-bold text-[20px] mb-10">Dashboard</h1>

      <div className="flex justify-between gap-6">
        <div className="w-[50%] bg-white drop-shadow rounded-[8px]  flex flex-col justify-between">
          <div className="">
            {/* <h3 className="font-semibold text-[18px]">Lease information</h3> */}
            <div className="bg-white drop-shadow-md border mt-6 border-gray-300 p-4">
              <h6 className="font-semibold text-[20px] text-gray-600">
                Lease Information
              </h6>
              {isLoading ? (
                <div className="loadingCont flex justify-center items-center h-screen w-full">
                  <LoadingSpinner />
                </div>
              ) : currLease && currLease.leaseId ? (
                <>
                  <div className="flex gap-4 items-center">
                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">First name</p>
                      <p className="text-[14px]">{currLease.firstName}</p>
                    </div>

                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">Last name </p>
                      <p className="text-[14px]">{currLease.lastName}</p>
                    </div>
                  </div>

                  <div className="w-full border-gray border-b pb-4">
                    <p className="mt-4 text-[18px]">DOB</p>
                    <p className="text-[14px]">{currLease.dateOfBirth}</p>
                  </div>

                  <div className="flex gap-4 flex-wrap items-center border-gray border-b pb-4">
                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">Email</p>
                      <p className="text-[14px]">{currLease.email}</p>
                    </div>

                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">Contact number</p>
                      <p className="text-[14px]">{currLease.phoneNumber}</p>
                    </div>

                    {/* <div className="w-[40%]">
                        <p className="mt-4 text-[18px]">Identification number</p>
                          <p className="text-[14px]">{}</p>
                      </div> */}
                  </div>

                  <div className="flex gap-4 ">
                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">Address</p>
                      <p className="text-[14px]">{currLease.streetAddress}</p>
                    </div>

                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">Occupants</p>
                      <p className="text-[14px]">{currLease.numOccupants}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">Start date</p>
                      <p className="text-[14px]">{currLease.startDate}</p>
                    </div>

                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">End date</p>
                      <p className="text-[14px]">{currLease.endDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-[50%]">
                      <p className="mt-4 text-[18px]">Rent</p>
                      <p className="text-[14px]">{currLease.monthlyRent}</p>
                    </div>

                    {/* <div className="w-[40%]">
                        <p className="mt-4 text-[18px]">Maintenance </p>
                        <p className="text-[14px]">$ 200</p>
                      </div> */}
                  </div>

                  {/* <div>
                      <p className="mt-4 text-[18px]">Deposite </p>
                      <p className="text-[14px]">$ 1000</p>
                    </div> */}
                </>
              ) : (
                <p>No Lease Added Yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[50%] bg-white drop-shadow rounded-[8px]">
          <div className="">
            <div className="bg-white drop-shadow-md border mt-6 border-gray-300 p-4">
              <h6 className="font-semibold text-[20px] text-gray-600">
                Contact Information
              </h6>

              <p className="mt-4 text-[18px]">Contact number</p>
              <p className="text-[16px]">+1 555 555 1234</p>

              <p className="mt-4 text-[18px]">Email</p>
              <p className="text-[16px]">{auth.email}</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="font-bold text-[16px] mt-12 mb-4">Your Posts</h1>
      <div className="flex flex-wrap gap-6 mb-12">
        {posts &&
          posts.map((data, index) => (
            <div
              className="w-[25%] mt-6 card card-compact bg-base-100 shadow-xl"
              key={index}
            >
              {/* <Link to={`/tenantdashboard/community/${data.id}`}> */}
              <div className="">
                <img
                  className="h-[200px] w-full object-cover "
                  src={data.imageUrl}
                />
                <div className="card-body">
                  <h2 className="card-title">{data.name}</h2>
                  <p>{data.description}</p>
                  <div className="flex justify-between items-center card-actions">
                    <h2 className="font-bold text-[22px]">$ {data?.price}</h2>
                    <button
                      onClick={() => handleEditPost(data)}
                      className="bg-green-700 text-white tracking-wider rounded-full px-10 py-2"
                    >
                      Edit Post
                    </button>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </div>
          ))}
      </div>

      {/* <div className="my-8 border-l-4 border-green-700 w-11/12 py-11 flex justify-between items-center bg-white drop-shadow rounded-[8px] p-6">
        <Link className="cursor-pointer" to={"/tenantdashboard/payments"}>
          <h3 className="font-medium text-[26px]">Your Current Balance</h3>
          <h3 className="font-extrabold text-[26px]">$ 0.00</h3>
        </Link>

        <div>
          <button
            onClick={handlePayment}
            className="bg-green-700 text-white tracking-wider rounded-full px-10 py-4"
          >
            Make payment
          </button>
        </div>
      </div> */}

      <div className="flex justify-between gap-6">
        {/* <div className="w-[50%] h-[300px] overflow-auto bg-white drop-shadow rounded-[8px] p-6 flex flex-col justify-between">
          <div className="">
            <h3 className="font-semibold text-[18px]">Open request</h3>
            {requestsData &&
              requestsData.map((data, index) => (
                <Link
                  to={"/tenantdashboard/requests"}
                  className="mt-6 flex items-center gap-4"
                  key={index}
                >
                  <div className="border-2 border-green-700 bg-green-100 text-green-700 text-[22px] p-3 rounded-[8px]">
                    <FiTool />
                  </div>
                  <div>
                    <h6 className="text-[16px] font-semibold">
                      {data.requestSubject}
                    </h6>
                    <p className="text-[12px] font-medium text-gray-500">
                      {data.requestType}
                    </p>
                  </div>
                </Link>
              ))}
          </div>

          <button
            onClick={() => navigate("/tenantdashboard/requests/new-request")}
            className="bg-green-700 text-white mt-6 tracking-wider rounded-full px-10 py-2 self-start"
          >
            Create request
          </button>
        </div> */}

        <div className="w-[50%] h-[300px] overflow-auto bg-white drop-shadow rounded-[8px] p-6 mb-10">
          <div className="">
            <h3 className="font-semibold text-[18px]">New Announcements</h3>
            {isLoading ? (
              <div className="loadingCont flex justify-center items-center h-screen w-full">
                <LoadingSpinner />
              </div>
            ) : announcements && announcements.length !== 0 ? (
              announcements.map((data, index) => (
                <Link
                  to={"/tenantdashboard/announcements"}
                  className="mt-6 flex items-center gap-4"
                  key={index}
                >
                  <div className="border-2 border-green-700 bg-green-100 text-green-700 text-[22px] p-3 rounded-[8px]">
                    <FiTool />
                  </div>
                  <div>
                    <h6 className="text-[16px] font-semibold">{data.title}</h6>
                    <p className="text-[12px] font-medium text-gray-500">
                      {data.announcementdate}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <Link
                to={"/tenantdashboard/announcements"}
                className="mt-6 flex items-center gap-4"
              >
                <p>No new announcements at the moment</p>
              </Link>
            )}
          </div>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setTitle("");
                setDescription("");
                setPrice("");
                setAvailabilityStatus("");
                setEditMode(false);
                setSelectedPost(null);
                document.getElementById("my_modal_3").close();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">Edit Post</h3>

          <div className="modal-action flex flex-col justify-center ">
            <form method="dialog" onSubmit={handleUpdateSubmit}>
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
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-4"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="input input-bordered input-primary w-full h-20 pt-1"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-4"
                >
                  Price
                </label>
                <textarea
                  id="price"
                  className="input input-bordered input-primary w-full pt-1"
                  rows="4"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="availabilityStatus"
                  className="block text-sm font-medium text-gray-700 mb-4"
                >
                  Availability Status
                </label>
                <textarea
                  id="availabilityStatus"
                  className="input input-bordered input-primary w-full pt-1"
                  rows="4"
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Announcement
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default TenantOverview;
