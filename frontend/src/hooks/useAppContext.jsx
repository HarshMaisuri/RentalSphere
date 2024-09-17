import { useContext } from "react";
import AppContext from "../context/AppProvider.jsx";

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
