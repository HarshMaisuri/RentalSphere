import Axios from "axios";

// Set Axios defaults
Axios.defaults.withCredentials = true;

// Function to handle HTTP GET requests
export const httpGet = async (url, headers = {}) => {
  try {
    const response = await Axios.get(url, { headers });
    return response.data;
  } catch (error) {
    handleHttpError(error);
    throw error;
  }
};

// Function to handle HTTP POST requests
export const httpPost = async (url, data = {}, headers = {}) => {
  try {
    const response = await Axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    handleHttpError(error);
    throw error;
  }
};

// Function to handle HTTP PUT requests
export const httpPut = async (url, data = {}, headers = {}) => {
  try {
    const response = await Axios.put(url, data, { headers });
    return response.data;
  } catch (error) {
    handleHttpError(error);
    throw error;
  }
};

// Function to handle HTTP DELETE requests
export const httpDelete = async (url, headers = {}) => {
  try {
    const response = await Axios.delete(url, { headers });
    return response.data;
  } catch (error) {
    handleHttpError(error);
    throw error;
  }
};

// Function to handle common HTTP error scenarios
const handleHttpError = (error) => {
  if (!error.response) {
    // Handle network errors
    console.error("Network Error:", error.message);
  } else {
    // Handle HTTP errors
    const { status, data } = error.response;
    console.error(`HTTP Error ${status}:`, data);
  }
};
