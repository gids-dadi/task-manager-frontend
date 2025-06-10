import axios from "axios";

const taskApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true, // send cookies if auth is involved
  headers: {
    "Content-Type": "application/json",
  },
});

export default taskApi;
