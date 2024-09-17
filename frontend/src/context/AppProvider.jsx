import { createContext, useState, useEffect } from "react";
import axios from "axios";
const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  //Global context states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMode, setAlertMode] = useState("error");
  const [alertDesc, setAlertDesc] = useState("Internal Server Error");

  // For Listings
  const [listings, setListings] = useState([]);
  const [singleListing, setSingleListing] = useState({});

  // For Property Manager Requests for Admin
  const [allPMReqs, setAllPMReqs] = useState([]);

  const [contProp, setContProp] = useState("");

  const [contTenantEmail, setContTenantEmail] = useState("");

  const [contTenant, setContTenant] = useState({});

  const [contReq, setContReq] = useState({});

  const [singlePost, setSinglePost] = useState({});

  // useEffect(() => {
  //   if (showAlert) {
  //     // Set a timeout to hide the toast after 3 seconds
  //     const timeoutId = setTimeout(() => {
  //       setShowAlert(false);
  //       console.log("showAlert offed", showAlert);
  //     }, 3000);

  //     // // Clean up the timeout if the component unmounts or showAlert changes
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [showAlert]);

  // useEffect(() => {
  //   setShowAlert(true);
  // }, []);

  // useEffect(() => {
  //   if (showAlert) {
  //     console.log("showAlert updated", showAlert);
  //   }
  // }, [showAlert]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        showAlert,
        setShowAlert,
        alertMode,
        setAlertMode,
        alertDesc,
        setAlertDesc,
        listings,
        setListings,
        singleListing,
        setSingleListing,
        allPMReqs,
        setAllPMReqs,
        contProp,
        setContProp,
        contTenantEmail,
        setContTenantEmail,
        contTenant,
        setContTenant,
        contReq,
        setContReq,
        singlePost,
        setSinglePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
