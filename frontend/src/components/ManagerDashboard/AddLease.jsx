import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAppContext from "../../hooks/useAppContext";
import { toast, Bounce } from "react-toastify";
const LEASE_URL = "http://localhost:8080/api/v1/lease/";

const testFormValues = {
  documentName: "Document 1",
  startDate: "22 Feb 2024",
  endDate: "22 Jan 2025",
  monthlyRent: 1200,
};

const initialFormValues = {
  monthlyRent: "",
};

const AddLease = () => {
  const { auth } = useAuth();
  const { contProp, contTenant } = useAppContext();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [formData, setFormData] = useState(initialFormValues);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    setFiles([...files, e.target.files[0]]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("email", auth.email);
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }
    formDataToSend.append("startDate", startDateRef.current.value);
    formDataToSend.append("endDate", endDateRef.current.value);
    console.log(files);
    files.map((file) => formDataToSend.append("leasePdf", file));

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    console.log(headers);
    console.log(formData);

    await axios.post(LEASE_URL, formDataToSend, { headers });
    toast.success("New Lease Created", {
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
    setFormData(initialFormValues);
    setFiles([]);
    startDateRef.current.value = "";
    endDateRef.current.value = "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (("this is contProp", contProp)) {
      console.log(contProp);
      setFormData({ ...formData, propertyId: contProp });
    }
  }, [contProp]);

  useEffect(() => {
    console.log(contTenant);
    if (contTenant && contTenant.tenantID != "") {
      setFormData({ ...formData, tenantId: contTenant.tenantID });
    }
  }, [contTenant]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-2xl font-bold">Add New Lease</h1>
      <div>
        <div className="grid items-center grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3 mt-6">
          <div className="text-gray-600">
            <div>
              <img
                src="/img/house-document-contract-7780840-6184494.webp"
                alt="lease-img"
              />
            </div>
          </div>

          <div className="lg:col-span-2 drop-shadow-md border border-gray-300 p-6">
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-6">
              <div className="flex flex-col gap-2 md:col-span-6">
                <label htmlFor="" className="font-medium text-[16px]">
                  Select documents
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={(e) => handleFileUpload(e)}
                />
              </div>

              <div className="mt-4 md:col-span-3">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                  ref={startDateRef}
                />
              </div>

              <div className="mt-4 md:col-span-3">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                  ref={endDateRef}
                />
              </div>

              <div className="mt-4 md:col-span-6">
                <label htmlFor="monthlyRent">Monthly Rent</label>
                <input
                  type="text"
                  name="monthlyRent"
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                  value={formData.monthlyRent}
                  onChange={(e) => handleInputChange(e)}
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
    </form>
  );
};

export default AddLease;
