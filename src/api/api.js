import axios from "axios";

export const api = axios.create({
  baseURL: "https://itmp.sulla.hu",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});
