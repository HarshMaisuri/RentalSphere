import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpPost } from "../../Utils/HttpRequest.jsx";
import useAuth from "../../hooks/useAuth.jsx";
const CHANGE_PASSW_URL = "http://localhost:8080/api/v1/auth/changepassword";

const PasswordReset = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { auth, setAuth } = useAuth();

  // useEffect(() => {
  //   const validateToken = async () => {
  //     try {
  //       const response = await httpPost(
  //         "/",
  //         { token },
  //         { headers: { "Content-Type": "application/json" } }
  //       );
  //       if (!response.success) {
  //         setErrMsg("Invalid or expired token");
  //         setTimeout(() => {
  //           // window.location.href = "/login"; // Redirect to login page after showing error message
  //           navigate(`/login`, {
  //             replace: true,
  //           });
  //         }, 3000);
  //       }
  //     } catch (error) {
  //       setErrMsg("Failed to validate token");
  //     }
  //   };

  //   validateToken();
  // }, [token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    try {
      const response = await httpPost(
        CHANGE_PASSW_URL,
        {
          email: auth.email,
          token: token,
          newPassword: newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.success) {
        setSuccessMsg("Password reset successful");
        setAuth({});
        navigate("/login", { replace: true });
      } else {
        setErrMsg(response.message);
      }
    } catch (error) {
      setErrMsg("Failed to reset password. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center justify-items-center text-center">
        <h1 className="font-bold text-4xl justify-self-auto mb-20">
          Password Reset
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset Password
            </button>
          </div>
          {errMsg && <p className="text-red-500 text-sm mt-1">{errMsg}</p>}
          {successMsg && (
            <p className="text-green-500 text-sm mt-1">{successMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
