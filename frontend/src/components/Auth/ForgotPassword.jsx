import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
import { httpPost } from "../../Utils/HttpRequest.jsx"; // Import the httpRequest module
import useAuth from "../../hooks/useAuth.jsx";
const FORGOT_PASSW_URL = "http://localhost:8080/api/v1/auth/forgotpassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { auth, setAuth } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      if (
        window.localStorage.getItem("role") &&
        window.localStorage.getItem("role") === "TENANT"
      ) {
        navigate(`/tenantdashboard`, {
          replace: true,
        });
      } else if (
        window.localStorage.getItem("role") &&
        window.localStorage.getItem("role") === "MANAGER"
      ) {
        navigate(`/managerdashboard`, {
          replace: true,
        });
      } else {
        navigate(`/`, {
          replace: true,
        });
      }
    }
  }, [navigate]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrMsg("");
    setSuccessMsg("");

    if (!validateEmail(email)) {
      setIsLoading(false);
      setErrMsg("Please enter a valid email address");
      return;
    }

    try {
      const response = await httpPost(
        FORGOT_PASSW_URL,
        { email: email },
        { headers: { "Content-Type": "application/json" } }
      );
      setIsLoading(false);
      if (response.success) {
        setSuccessMsg("Password reset instructions sent to your email.");
        setAuth({
          email: email,
        });
      } else {
        setErrMsg(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      setErrMsg("Failed to reset password. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center justify-items-center text-center">
        <h1 className="font-bold text-4xl justify-self-auto mb-20">
          Password Recovery
        </h1>
      </div>

      {isLoading ? (
        <div className="loadingCont flex justify-center items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john.doe@gmail.com"
                  className="input input-bordered input-primary w-full"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              {errMsg && <p className="text-red-500 text-sm mt-1">{errMsg}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
            {successMsg && (
              <p className="text-green-500 text-sm mt-1">{successMsg}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
