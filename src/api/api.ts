import axios from "axios";

const api = axios.create({
  baseURL: "https://passwordremember-production.up.railway.app/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("acess_token"),
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default api;
