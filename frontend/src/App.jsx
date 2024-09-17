import "./App.css";
import { createContext, useState, useEffect } from "react";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import AppRoutes from "./AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { AppProvider } from "./context/AppProvider.jsx";
// import useAppContext from "./hooks/useAppContext.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthProvider>
        <AppProvider>
          <div className="flex-col min-h-screen h-screen justify-between">
            <Navbar />
            <div className="min-h-full">
              <AppRoutes />
            </div>
            <Footer />
          </div>
          <ToastContainer />
        </AppProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
