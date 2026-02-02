import axios from "axios";

const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,          
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Optional: Global error handler
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Axios Error:", error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
