import { useContext } from "react";
import AlertContext from "../context/AlertProvider.jsx";

const useAlertContext = () => {
  return useContext(AlertContext);
};

export default useAlertContext;
