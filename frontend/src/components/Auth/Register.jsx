import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { toast, Bounce } from "react-toastify";
import useAuth from "../../hooks/useAuth.jsx";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
const REGISTER_URL = "http://localhost:8080/api/v1/auth/register";

export default function Register() {
  Axios.defaults.withCredentials = true;

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");

  useEffect(() => {
    setErrMsg("");
    setUserEmailError("");
    setPasswordError("");
    setFNameError("");
    setLNameError("");
  }, [userEmail, pwd, fName, lName]);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate(`/home`, {
        replace: true,
      });
      // if (
      //   window.localStorage.getItem("role") &&
      //   window.localStorage.getItem("role") === "TENANT"
      // ) {
      //   navigate(`/tenantdashboard`, {
      //     replace: true,
      //   });
      // } else if (
      //   window.localStorage.getItem("role") &&
      //   window.localStorage.getItem("role") === "PROPERTY MANAGER"
      // ) {
      //   navigate(`/managerdashboard`, {
      //     replace: true,
      //   });
      // } else {
      //   navigate(`/`, {
      //     replace: true,
      //   });
      // }
    }
  }, [navigate]);

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^\S+@\S+\.\S+$/; // Regex for email validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Regex for password validation

    // Email validation
    if (!userEmail.trim()) {
      setUserEmailError("Please enter your email address");
      isValid = false;
    } else if (!emailRegex.test(userEmail)) {
      setUserEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!pwd.trim()) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else if (!passwordRegex.test(pwd)) {
      setPasswordError(
        "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number"
      );
      isValid = false;
    }

    // First Name validation
    if (!fName.trim()) {
      setFNameError("Please enter your first name");
      isValid = false;
    }

    // First Name validation
    if (!lName.trim()) {
      setLNameError("Please enter your last name");
      isValid = false;
    }

    return isValid;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    if (!validateInputs()) {
      // console.log("Hitting this code");
      return;
    }

    try {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await Axios.post(
        REGISTER_URL,
        {
          firstName: fName,
          lastName: lName,
          email: userEmail,
          password: pwd,
        },
        {
          headers: headers,
        }
      );

      if (!response.data.token && !response.data.success) {
        setLoginStatus(false);
      } else {
        console.log(response.data);
        setAuth({
          email: response.data.email,
          token: response.data.token,
          role: response.data.roles[1]
            ? response.data.roles[1]
            : response.data.roles[0],
        });
        setLoginStatus(true);
        toast.success("Registration Successful!", {
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
        navigate(`/home`, { replace: true });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("User with same email already exists");
      } else if (err.response?.status === 400) {
        setErrMsg("Validation Failed");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center justify-items-center text-center">
          <h1 className="font-bold text-4xl justify-self-auto mb-20">
            RentalSphere
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register as a New User
          </h2>
        </div>

        {isLoading ? (
          <div className="loadingCont flex justify-center items-center h-screen w-full">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-6"
              action="#"
              // method="POST"
            >
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
                    // type="email"
                    // autoComplete="email"
                    required
                    placeholder="john.doe@gmail.com"
                    className={`input input-bordered input-primary w-full ${
                      userEmailError ? "border-red-500" : ""
                    }`}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                    value={userEmail}
                  />

                  {userEmailError && (
                    <p className="text-red-500 text-sm mt-1">
                      {userEmailError}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    // type="email"
                    // autoComplete="email"
                    required
                    placeholder="John"
                    className={`input input-bordered input-primary w-full ${
                      fNameError ? "border-red-500" : ""
                    }`}
                    onChange={(e) => {
                      setFName(e.target.value);
                    }}
                    value={fName}
                  />

                  {fNameError && (
                    <p className="text-red-500 text-sm mt-1">{fNameError}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    // type="email"
                    // autoComplete="email"
                    required
                    placeholder="Doe"
                    className={`input input-bordered input-primary w-full ${
                      lNameError ? "border-red-500" : ""
                    }`}
                    onChange={(e) => {
                      setLName(e.target.value);
                    }}
                    value={lName}
                  />
                  {lNameError && (
                    <p className="text-red-500 text-sm mt-1">{lNameError}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    // autoComplete="current-password"
                    placeholder="********"
                    required
                    className={`input input-bordered input-primary w-full ${
                      passwordError ? "border-red-500" : ""
                    }`}
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    value={pwd}
                  />

                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  // onClick={login}
                >
                  Register
                </button>
              </div>
              {errMsg && <p className="text-red-500 text-sm mt-1">{errMsg}</p>}
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Existing User?{" "}
              <Link
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                to={"/login"}
              >
                Sign In
              </Link>
            </p>

            {loginStatus && (
              <button onClick={userAuthenticated}>
                Check if authenticated
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
