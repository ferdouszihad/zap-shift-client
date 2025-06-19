import axios from "axios";

import useAuth from "./useAuth";
import { Navigate, useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    // Request Interceptor
    axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error?.response?.status;

        if (status === 403) {
          navigate("/forbidden");
        }

        if (status === 401 || status === 400) {
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
