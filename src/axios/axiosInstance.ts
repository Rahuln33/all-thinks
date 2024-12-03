import axios, { AxiosInstance, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.107:5000/",
});

axiosInstance.interceptors.request.use((req) => req);

axiosInstance.interceptors.response.use((res: AxiosResponse) => res);

export default axiosInstance;
