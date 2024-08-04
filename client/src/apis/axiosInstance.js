import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://hybrid.srishticampus.in/tradehub_api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
const axiosInstance = axios.create({
  baseURL: "http://localhost:4033/tradehub_api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
