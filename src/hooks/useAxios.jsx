import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
