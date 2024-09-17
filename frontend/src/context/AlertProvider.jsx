import { createContext, useState, useEffect } from "react";
import axios from "axios";
const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
  const [error, setError] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMode, setAlertMode] = useState("error");
  const [alertDesc, setAlertDesc] = useState("Internal Server Error");

  useEffect(() => {
    if (showAlert) {
      // Set a timeout to hide the toast after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
        console.log("showAlert offed", showAlert);
      }, 3000);

      // // Clean up the timeout if the component unmounts or showAlert changes
      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  useEffect(() => {
    setShowAlert(true);
  }, []);

  useEffect(() => {
    if (showAlert) {
      console.log("showAlert updated", showAlert);
    }
  }, [showAlert]);

  return (
    <AlertContext.Provider
      value={{
        error,
        setError,
        showAlert,
        setShowAlert,
        alertMode,
        setAlertMode,
        alertDesc,
        setAlertDesc,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
