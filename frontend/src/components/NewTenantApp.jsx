import React, { useState, useRef } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import LoadingSpinner from "../assets/LoadingSpinner.jsx";
const NEW_TENANT_URL =
  "http://localhost:8080/api/v1/tenantapplications/register";

const testFormValues = {
  // emailAddress: "",
  phoneNumber: "9029895829",
  // dateOfBirth: "",
  socialSecurityNumber: "B00963417",
  streetAddress: "5651 Ogilvie Street",
  // desiredMoveInDate: "",
  leaseTermMonths: "12",
  numOccupants: "4",
  currentEmployer: "McDonalds",
  lengthOfEmployment: "12",
  creationDate: "2024-03-21",
  // propertyApplicationID: "",
};

const initialValues = {
  emailAddress: "",
  phoneNumber: "",
  // dateOfBirth: "",
  socialSecurityNumber: "",
  streetAddress: "",
  // desiredMoveInDate: "",
  leaseTermMonths: "",
  numOccupants: "",
  currentEmployer: "",
  lengthOfEmployment: "",
  creationDate: "",
  propertyApplicationID: "",
};

const NewTenantApp = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const desiredMoveInDateRef = useRef();
  const DOBRef = useRef();
  const [formData, setFormData] = useState(testFormValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("emailAddress", auth.email);
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }
    formDataToSend.append(
      "desiredMoveInDate",
      desiredMoveInDateRef.current.value
    );
    formDataToSend.append("dateOfBirth", DOBRef.current.value);
    formDataToSend.append("propertyApplicationID", id);

    const jsonToSend = {
      ...formData,
      emailAddress: auth.email,
      desiredMoveInDate: desiredMoveInDateRef.current.value,
      dateOfBirth: DOBRef.current.value,
      propertyApplicationID: id,
    };

    const headers = {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json",
    };
    console.log(desiredMoveInDateRef.current.value);
    console.log(headers);
    console.log(formData);

    await axios
      .post(NEW_TENANT_URL, jsonToSend, { headers })
      .then((res) => {
        console.log(res);
        toast.success("Application submitted", {
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
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error: Submit failure", {
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
      .finally(() => {
        setIsLoading(false);
        setFormData(initialValues);
        desiredMoveInDateRef.current.value = "";
        DOBRef.current.value = "";
      });
  };

  return (
    <form
      className="flex items-center justify-center min-h-screen p-6 bg-gray-100"
      onSubmit={(e) => handleSubmit(e)}
    >
      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="container flex flex-col max-w-screen-lg mx-auto">
          <h1 className="text-xl font-semibold text-gray-600 mb-6">
            Application form to become a tenant
          </h1>
          <h2 className="mb-6 text-gray-500">
            Please enter your personal details for approval from the property
            manager
          </h2>

          <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="text-lg font-bold">Hello there</p>
                <p>All fields mandatory*</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                  <div className="mt-4 md:col-span-2">
                    <label htmlFor="monthlyRent">Current Employer</label>
                    <input
                      type="text"
                      name="currentEmployer"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      value={formData.currentEmployer}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div className="mt-4 md:col-span-2">
                    <label htmlFor="birthDate">Date of Birth</label>
                    <input
                      type="date"
                      name="birthDate"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      ref={DOBRef}
                    />
                  </div>

                  <div className="mt-4 md:col-span-3">
                    <label htmlFor="streetAddress">
                      Current Address/Street
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>

                  <div className="mt-4 md:col-span-3">
                    <label htmlFor="socialSecurityNumber">
                      Identification Number
                    </label>
                    <input
                      type="text"
                      name="socialSecurityNumber"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      value={formData.socialSecurityNumber}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>

                  <div className="mt-4 md:col-span-2">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>

                  <div className="mt-4 md:col-span-2">
                    <label htmlFor="desiredMoveInDate">
                      Desired Move In Date
                    </label>
                    <input
                      type="date"
                      name="desiredMoveInDate"
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      ref={desiredMoveInDateRef}
                    />
                  </div>
                  <div className="mt-4 md:col-span-5">
                    <div className="inline-flex items-center">
                      <button
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default NewTenantApp;
