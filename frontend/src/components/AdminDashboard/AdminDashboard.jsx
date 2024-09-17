import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { propManagersData } from "../../Utils/sampleDataHarsh.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import useAppContext from "../../hooks/useAppContext.jsx";
import { toast, Bounce } from "react-toastify";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
const ALL_PMREQS_URL = "http://localhost:8080/api/v1/admin/properties";
const PMREQ_APPROVE_URL = "http://localhost:8080/api/v1/admin/approve/";
const PMREQ_REJECT_URL = "http://localhost:8080/api/v1/admin/reject/";

const AdminDashboard = () => {
  const { auth } = useAuth();
  const { allPMReqs, setAllPMReqs } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // const isAuthEmpty =
  //   Object.keys(auth).length === 0 && auth.constructor === Object;

  useEffect(() => {
    if (auth && auth.role && auth.role !== "ADMIN") {
      // setShowDash(false);
      navigate(`/home`, { replace: true });
      // window.alert("You're not logged in. Please log in first.");
      toast.error("You're not logged in. Please log in first.", {
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
    }
  }, [auth, navigate]);

  useEffect(() => {
    fetchPMReqs();
  }, [auth, navigate]);

  const fetchPMReqs = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .get(ALL_PMREQS_URL, { headers })
      .then((res) => {
        setAllPMReqs(res.data.propertyManagerRequest);
        console.log("Fetched PMReqs: ", res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleApproveReq = async (email) => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    // console.log(headers);
    setIsLoading(true);
    await axios
      .post(PMREQ_APPROVE_URL + email, {}, { headers })
      .then((res) => console.log("Data from handleApproveReq", res))
      .catch((err) => console.log(err));
    toast.success("Request Approved", {
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
    fetchPMReqs();
  };

  const handleRejectReq = async (email) => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    await axios
      .post(PMREQ_REJECT_URL + email, {}, { headers })
      .then((res) => console.log("Data from handleRejectReq", res))
      .catch((err) => console.log(err));
    toast.success("Request Rejected", {
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
    fetchPMReqs();
  };

  // const handleViewDetails = async (pmReq, index) => {
  //   setCont
  //   navigate(`/admin/${index}`);
  // };

  return (
    <>
      <div className="container flex items-center justify-between py-6">
        <p className="mb-4 text-2xl font-bold">AdminDashboard</p>
        <div
          className="px-4 py-2 text-white cursor-pointer bg-slate-500 text-md "
          onClick={() => navigate("/approved-managers")}
        >
          Approved Property Managers
        </div>
      </div>

      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="mt-10 mb-4 text-xl font-bold">
            Property Manager Requests
          </h1>
          <table className="table mt-10">
            <thead>
              <tr>
                {/* <th className="px-4 py-2">ID</th> */}
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">ID Number</th>
                <th className="px-4 py-2">Approve/Reject Requests</th>
                {/* <th className="px-4 py-2">View Details</th> */}
              </tr>
            </thead>
            <tbody>
              {!isLoading && allPMReqs ? (
                allPMReqs?.map((pmReq, index) => (
                  <tr key={index}>
                    {/* <td className="px-4 py-2 border">{pmReq.id}</td> */}
                    <td className="px-4 py-2 border">{pmReq.firstName}</td>
                    <td className="px-4 py-2 border">{pmReq.lastName}</td>
                    <td className="px-4 py-2 border">{pmReq.email}</td>
                    <td className="px-4 py-2 border">{pmReq.phoneNumber}</td>
                    <td className="px-4 py-2 border">{pmReq.requestDate}</td>
                    <td className="px-4 py-2 border">{pmReq.licenseNumber}</td>
                    {/* <td className="gap-4 px-4 py-2 border">
                  <button
                    // onClick={() => viewDetails(pmReq.id)}
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                  >
                    View
                  </button>
                </td> */}
                    <td className="flex justify-around gap-4 px-4 py-2 border">
                      <button
                        onClick={() => handleApproveReq(pmReq.email)}
                        className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectReq(pmReq.email)}
                        className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </td>
                    {/* <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleViewDetails(pmReq, index)}
                        className="px-4 py-2 mr-2 font-bold text-white bg-black rounded"
                      >
                        View
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <p>There are no Property Manger Requests at the moment</p>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="mb-6 text-lg font-bold"> Request Details</h3>
        </div>
      </dialog> */}
    </>
  );
};

export default AdminDashboard;
