import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import useAuth from "../../hooks/useAuth.jsx"; // Import the useAuth hook

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth(); // Get the auth object and the setAuth function

  // Function to handle logout
  const handleLogout = () => {
    // Clear the auth context
    console.log("Auth context was cleared!");
    setAuth({});
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout Successful!", {
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
    // Redirect to the homepage
    navigate("/");
  };

  const handlePMNavigate = () => {
    if (auth.role === "PROPERTY_MANAGER") {
      navigate("/managerdashboard");
    } else {
      navigate("/new-manager");
    }
  };

  const handleTenantNavigate = () => {
    if (auth.role === "TENANT") {
      navigate(`/tenantdashboard`);
    } else {
      window.alert(
        "You're not a tenant yet. Please apply to become one, thanks!"
      );
    }
  };
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1
              className="font-bold text-xl cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              RentalSphere
            </h1>
          </div>
          <div className="flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-4">
                <li
                  className="hover:text-red-600 cursor-pointer font-extrabold"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Home
                </li>
                {/* <li className="hover:text-red-600 font-extrabold cursor-pointer">
                  About
                </li>
                <li className="hover:text-red-600 font-extrabold">Contact</li> */}
              </ul>
            </nav>

            {/* Conditional rendering based on the presence of email and token */}
            <div className="flex items-center space-x-4">
              {location.pathname === "/home" && auth.email && auth.token ? (
                <>
                  <button
                    className="px-4 py-2 bg-gray-800 capitalize hover:bg-gray-600 text-white rounded-full font-semibold"
                    // onClick={() => {
                    //   navigate("/new-manager");
                    // }}
                    onClick={handlePMNavigate}
                  >
                    Property Manager
                  </button>

                  <button
                    className="px-4 py-2 bg-gray-800 capitalize hover:bg-gray-600 text-white rounded-full font-semibold"
                    onClick={handleTenantNavigate}
                  >
                    Tenant
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-800  hover:bg-gray-600 text-white rounded-full font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : auth.email && auth.token && location.pathname !== "/home" ? (
                <button
                  className="px-4 py-2 bg-gray-800  hover:bg-gray-600 text-white rounded-full font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="px-4 py-2 bg-gray-800  hover:bg-gray-600 text-white rounded-full font-semibold"
                    onClick={() => {
                      navigate(`/login`);
                    }}
                  >
                    Login/Register
                  </button>
                  {/* <button
                    className="px-4 py-2 bg-gray-800  hover:bg-gray-600 text-white rounded-full font-semibold"
                    onClick={() => {
                      navigate(`/register`);
                    }}
                  >
                    Register
                  </button> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
