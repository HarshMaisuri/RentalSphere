import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import { toast, Bounce } from "react-toastify";
import { productsData } from "../../Utils/sampleDataHarsh.jsx";
const POSTS_URL = "http://localhost:8080/api/v1/marketplace/post/";

const initialFormValues = {
  title: "",
  description: "",
  price: "",
};

const TenantNewPost = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [formData, setFormData] = useState(initialFormValues);
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("email", auth.email);
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }
    console.log(files);
    files.map((file) => formDataToSend.append("image", file));

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    await axios
      .post(POSTS_URL, formDataToSend, { headers })
      .then((res) => {
        toast.success("Post Created", {
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
      .catch((err) => console.log(err))
      .finally(navigate("/tenantdashboard/community"));
  };

  const handleFileUpload = (e) => {
    setFiles([...files, e.target.files[0]]);
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

  return (
    <form
      className="bg-white drop-shadow-md rounded-[8px] p-6"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h3 className="font-semibold text-[22px]">Create new post</h3>
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="title" className="font-medium text-[16px]">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange(e)}
          placeholder="title"
          name="title"
          className="input input-bordered w-full "
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="description" className="font-medium text-[16px]">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleInputChange(e)}
          placeholder="Description"
          name="description"
          className="input input-bordered w-full "
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="price" className="font-medium text-[16px]">
          Price
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange(e)}
          placeholder="Price"
          name="price"
          className="input input-bordered w-full "
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="image" className="font-medium text-[16px]">
          Select image
        </label>
        <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
      </div>

      <button
        type="submit"
        className="bg-green-700 text-white tracking-wider rounded-full  mt-6 px-10 py-2"
      >
        Publish new post
      </button>
    </form>
  );
};

export default TenantNewPost;
