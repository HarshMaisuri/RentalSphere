import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth.jsx";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
const LOGIN_URL = "http://localhost:8080/api/v1/auth/login";
import { toast, Bounce } from "react-toastify";
import { httpPost } from "../../Utils/HttpRequest.jsx"; // Import the httpRequest module

export default function Login() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { auth, setAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  // const [loginStatus, setLoginStatus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setErrMsg("");
    setUserEmailError("");
    setPasswordError("");
  }, [userEmail, pwd]);

  // useEffect(() => {
  //   if (window.localStorage.getItem("token")) {
  //     if (
  //       window.localStorage.getItem("role") &&
  //       window.localStorage.getItem("role") === "TENANT"
  //     ) {
  //       navigate(`/tenantdashboard`, {
  //         replace: true,
  //       });
  //     } else if (
  //       window.localStorage.getItem("role") &&
  //       window.localStorage.getItem("role") === "ADMIN"
  //     ) {
  //       navigate(`/admin`, {
  //         replace: true,
  //       });
  //     } else {
  //       navigate(`/`, {
  //         replace: true,
  //       });
  //     }
  //   }
  // }, [navigate]);

  useEffect(() => {
    // if (from && from !== "/") {
    //   navigate(from, {
    //     replace: true,
    //   });
    // } else
    if (auth && auth.role && auth.role === "ADMIN") {
      navigate("/admin");
    } else if (auth && auth.role && auth.role === "TENANT") {
      navigate("/tenantdashboard", { replace: true });
    } else if (auth && auth.role && auth.role === "PROPERTY_MANAGER") {
      navigate("/managerdashboard", { replace: true });
    } else if (auth && auth.role && auth.role === "USER") {
      navigate("/home", { replace: true });
    } else {
    }
  }, [auth, navigate]);

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

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }
    setIsLoading(true);
    setErrMsg("");
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email: userEmail, password: pwd },
        { headers }
      );
      setAuth({
        email: response.data.email,
        token: response.data.token,
        role: response.data.roles[1]
          ? response.data.roles[1]
          : response.data.roles[0],
      });

      toast.success("Login Successful!", {
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
    } catch (error) {
      console.log(error);

      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response.status === 409) {
        setErrMsg("Missing Username or Password");
      } else if (error.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
        toast.error("Login Failed", {
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
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateInputs()) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   setErrMsg("");
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   await axios
  //     .post(LOGIN_URL, { email: userEmail, password: pwd }, { headers })
  //     .then((res) => {
  //       console.log(res);
  //       setAuth({
  //         email: res.email,
  //         token: res.token,
  //         role: res.roles[0],
  //       });
  //       toast.success("Login Successful!", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //       // if (res.success) {
  //       //   console.log(res);
  //       //   setAuth({
  //       //     email: response.email,
  //       //     token: response.token,
  //       //     role: response.roles[1] ? response.roles[1] : response.roles[0],
  //       //   });
  //       //   toast.success("Login Successful!", {
  //       //     position: "top-center",
  //       //     autoClose: 1000,
  //       //     hideProgressBar: false,
  //       //     closeOnClick: true,
  //       //     pauseOnHover: true,
  //       //     draggable: true,
  //       //     progress: undefined,
  //       //     theme: "light",
  //       //     transition: Bounce,
  //       //   });
  //       // } else {
  //       //   setErrMsg("Invalid username or password");
  //       // }
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //       if (!error?.response) {
  //         console.log(error);
  //         setErrMsg("No Server Response");
  //       } else if (error.response?.status === 409) {
  //         setErrMsg("Missing Username or Password");
  //       } else if (error.response?.status === 401) {
  //         setErrMsg("Unauthorized");
  //       } else {
  //         setErrMsg("Login Failed");
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const handleForgotPassword = () => {
    // Navigate to the password recovery route
    navigate("/forgotpassword");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center justify-items-center text-center">
          <h1 className="font-bold text-4xl justify-self-auto mb-20">
            RentalSphere
          </h1>
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {isLoading ? (
          <div className="loadingCont flex justify-center items-center h-screen w-full">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit}
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="************"
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

              <div className="mt-2 flex justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  // onClick={login}
                >
                  Sign in
                </button>
              </div>
              {errMsg && <p className="text-red-500 text-sm mt-1">{errMsg}</p>}
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              New User?{" "}
              <Link
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                to={"/register"}
              >
                Register
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
