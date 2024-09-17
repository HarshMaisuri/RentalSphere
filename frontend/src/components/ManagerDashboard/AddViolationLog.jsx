import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import useAuth from "../../hooks/useAuth.jsx";
import { toast, Bounce } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
const NEW_VLOG_URL = "http://localhost:8080/api/v1/violationlog/";

const testFormValues = {
  title: "title lorem",
  description:
    "1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
  monetaryDamage: "200",
  personalComment: "Lorem Ipsum is simply",
  damageIntensity: "Moderate",
};

const initialFormValues = {
  title: "",
  description: "",
  monetaryDamage: "",
  personalComments: "",
  intensity: "",
  date: new Date().toLocaleDateString("en-CA"),
};

const AddViolationLog = () => {
  const { contProp, contTenant } = useAppContext();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  // const [formData, setFormData] = useState(testFormValues);
  const [formData, setFormData] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contProp) {
      toast.error("Please select a property first", {
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
      return;
    }
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    // let currentDate = new Date();
    // console.log(currentDate);
    // let formattedDate = currentDate.toLocaleDateString("en-CA");
    // console.log(formattedDate);
    // setFormData({ ...formData, date: new Date() });
    // console.log(formData);
    await axios.post(NEW_VLOG_URL, formData, { headers });
    toast.success("Violation Created", {
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
    navigate("/managerdashboard/violationlog");
    setFormData(initialFormValues);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(contProp);
    if (contProp && contProp !== "") {
      setFormData({ ...formData, propertyId: contProp });
    }
  }, [contProp]);

  useEffect(() => {
    console.log(contTenant);
    if (contTenant && contTenant.tenantID !== "") {
      setFormData({ ...formData, tenantId: contTenant.tenantID });
    }
  }, [contTenant]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-2xl font-bold">Violation Log</h1>
      <div>
        <div className="grid items-center grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3 mt-6">
          <div className="text-gray-600">
            {/* <p className="text-lg font-bold">Hello there</p>
              <p>All fields mandatory*</p> */}

            <div>
              <img
                src="/img/exclamation-mark-yellow-triangle-symbol-isolated-white-background-3d-rendering-illustration_276199-111.avif"
                alt="violation-img"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-6">
              <div className="mt-4 md:col-span-6 drop-shadow-md font-semibold">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                  // ref={moveInDateRef}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="mt-4 md:col-span-6 drop-shadow-md font-semibold ">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                  // ref={moveInDateRef}
                  value={formData.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="mt-4 md:col-span-6 font-semibold">
                <label htmlFor="personalComments">Personal Comments</label>
                <input
                  type="text"
                  name="personalComments"
                  className="w-full h-10 px-4 mt-1 border drop-shadow-md rounded bg-gray-50"
                  value={formData.personalComments}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="mt-4 md:col-span-3 font-semibold">
                <label htmlFor="monetaryDamage">Monetary Damage</label>
                <input
                  type="text"
                  name="monetaryDamage"
                  className="w-full h-10 px-4 mt-1 border drop-shadow-md  rounded bg-gray-50"
                  value={formData.monetaryDamage}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="mt-4 md:col-span-3 relative drop-shadow-md font-semibold ">
                <label htmlFor="intensity">Damage Intensity: </label>
                <select
                  name="intensity"
                  aria-placeholder="Please Select a webhook type"
                  className="cursor-pointer appearance-none w-full h-10 px-4 mt-1 border rounded bg-gray-50 focus:outline-none"
                  value={formData.intensity}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option
                    className="bg-yellow-300 text-black font-semibold outline-none"
                    value="minor"
                  >
                    Minor
                  </option>
                  <option
                    className="bg-orange-400 text-black font-semibold outline-none"
                    value="moderate"
                  >
                    Moderate
                  </option>
                  <option
                    className="bg-red-500  text-black font-semibold outline-none"
                    value="severe"
                  >
                    Severe
                  </option>
                </select>
                <span className="absolute top-[60%] right-[2%]">
                  <IoIosArrowDown className="text-[#8D98AA] text-[20px]" />
                </span>
              </div>

              <div className="mt-4 md:col-span-5">
                <div className="inline-flex items-center">
                  <button
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
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

export default AddViolationLog;
