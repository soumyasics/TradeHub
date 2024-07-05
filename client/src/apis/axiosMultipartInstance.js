import axios from "axios";

export const axiosMultipartInstance = axios.create({
  // baseURL: "http://hybrid.srishticampus.in/tradehub_api/",
  baseURL: "http://localhost:4033/tradehub_api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
