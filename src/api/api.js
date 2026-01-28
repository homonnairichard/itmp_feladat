import axios from "axios";

export const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});
