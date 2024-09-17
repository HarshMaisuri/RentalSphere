import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { toast, Bounce } from "react-toastify";
import useAuth from "../../hooks/useAuth.jsx";
const NEW_PM_URL = "http://localhost:8080/api/v1/property/register";

const testFormValues = {
  // email: "",
  propertyDescription: "2BHK Apartment Unit",
  monthlyRent: "2500",
  numBathrooms: "2",
  numBedrooms: "2",
  propertyAddress: "5651 Ogilvie Street",
  city: "Halifax",
  country: "Canada",
  state: "Nova Scotia",
  zipCode: "B3H1B9",
  licenseNumber: "B00963417",
  phoneNumber: "9029895829",
  // date: new Date(),
  // availableMoveInDate: "",
  // images: [],
};

const initialValues = {
  // email: "",
  propertyDescription: "",
  monthlyRent: "",
  numBathrooms: "",
  numBedrooms: "",
  propertyAddress: "",
  city: "",
  country: "",
  state: "",
  zipCode: "",
  licenseNumber: "",
  phoneNumber: "",
  // date: new Date(),
  // availableMoveInDate: "",
  // images: [],
};

const NewPropertyManager = () => {
  const { auth } = useAuth();
  const moveInDateRef = useRef();

  const [formData, setFormData] = useState(initialValues);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    setFiles([...files, e.target.files[0]]);

    // const selectedFiles = e.target.files;
    // const newFiles = [];

    // for (let i = 0; i < selectedFiles.length; i++) {
    //   newFiles.push(selectedFiles[i]);
    // }

    // setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("email", auth.email);
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }
    formDataToSend.append("availableMoveInDate", moveInDateRef.current.value);
    console.log(files);
    files.map((file) => formDataToSend.append("images", file));

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    console.log(moveInDateRef.current.value);
    console.log(headers);
    console.log(formData);

    await axios.post(NEW_PM_URL, formDataToSend, { headers });
    toast.success("Request made to the Admin", {
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
    setFormData(initialValues);
    setFiles([]);
    moveInDateRef.current.value = "";
  };

  return (
    <form
      className="flex items-center justify-center min-h-screen p-6 bg-gray-100"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="container flex flex-col max-w-screen-lg mx-auto">
        <h1 className="text-xl font-semibold text-gray-600 mb-6">
          Property Manager Request Form
        </h1>
        <h2 className="mb-6 text-gray-500">
          You're not a Property Manager yet. Please enter all your property
          details for admin approval
        </h2>

        <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
          <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="text-lg font-bold">Hello there</p>
              <p>All fields mandatory*</p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                <div className="mt-4 md:col-span-5">
                  <label htmlFor="propertyDescription">
                    Property Description
                  </label>
                  <textarea
                    name="propertyDescription"
                    className="w-full h-24 px-2 pt-2 mt-1 border rounded resize-none bg-gray-50"
                    value={formData.propertyDescription}
                    maxLength={80}
                    onChange={(e) => handleInputChange(e)}
                  ></textarea>
                </div>
                <div className="mt-4 md:col-span-2">
                  <label htmlFor="monthlyRent">Monthly Rent</label>
                  <input
                    type="text"
                    name="monthlyRent"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    value={formData.monthlyRent}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mt-4 md:col-span-1">
                  <label htmlFor="numBathrooms">No. of Bathrooms</label>
                  <input
                    type="text"
                    name="numBathrooms"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    value={formData.numBathrooms}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div className="mt-4 md:col-span-1">
                  <label htmlFor="numBedrooms">No. of Bedrooms</label>
                  <input
                    type="text"
                    name="numBedrooms"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    value={formData.numBedrooms}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mt-4 md:col-span-3">
                  <label htmlFor="propertyAddress">Address/Street</label>
                  <input
                    type="text"
                    name="propertyAddress"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <div className="mt-4 md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    value={formData.city}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mt-4 md:col-span-2">
                  <label htmlFor="country">Country/Region</label>
                  <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                    <input
                      name="country"
                      placeholder="Country"
                      className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                      value={formData.country}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>

                <div className="mt-4 md:col-span-2">
                  <label htmlFor="state">State/Province</label>
                  <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                    <input
                      name="state"
                      placeholder="State"
                      type="text"
                      className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                      value={formData.state}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>

                <div className="mt-4 md:col-span-1">
                  <label htmlFor="zipCode">Zipcode</label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    className="flex items-center w-full h-10 px-4 mt-1 transition-all border rounded bg-gray-50"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mt-4 md:col-span-3">
                  <label htmlFor="licenseNumber">Identification Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    value={formData.licenseNumber}
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

                {/* <div className="mt-4 md:col-span-1">
                  <label htmlFor="Date">Date</label>
                  <input
                    type="Date"
                    name="date"
                    id="zipcode"
                    className="flex items-center h-10 px-4 mt-1 transition-all border rounded w-36 bg-gray-50"
                    value={formData.date}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div> */}

                {/* New fields */}

                <div className="mt-4 md:col-span-2">
                  <label htmlFor="availableMoveInDate">Move In Date</label>
                  <input
                    type="date"
                    name="availableMoveInDate"
                    className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                    ref={moveInDateRef}
                  />
                </div>

                <div className="flex flex-col mt-4 md:col-span-5">
                  <label htmlFor="images" className="">
                    Upload Images (up to 4)
                  </label>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="max-w-xs mt-4 file-input file-input-bordered "
                    multiple
                  />
                </div>

                {/* <div className="mt-4 md:col-span-5">
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="billing_same"
                      id="billing_same"
                      className="form-checkbox"
                    />
                    <label htmlFor="billing_same" className="mt-5">
                      I accept the Terms & Conditions
                    </label>
                  </div>
                </div> */}

                {/* Display uploaded images as thumbnails */}
                <div className="mt-4 md:col-span-5">
                  {files && (
                    <div className="flex flex-wrap -mx-2">
                      {files.map((image, index) => (
                        <div key={index} className="w-1/4 px-2 mb-4">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index + 1}`}
                            className="w-full h-auto rounded cursor-pointer"
                            onClick={() => removeFile(index)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
        {/* </div> */}

        {/* <a href="https://www.buymeacoffee.com/dgauderman" target="_blank" className="bottom-0 right-0 float-right p-4 md:absolute">
            <img src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg" alt="Buy Me A Coffee" className="transition-all -rotate-45 rounded-full shadow-lg w-14 hover:shadow-sm ring hover:ring-4 ring-white"/>
          </a> */}
      </div>
    </form>
  );
};

export default NewPropertyManager;
