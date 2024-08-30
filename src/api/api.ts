import axios from "axios";
import { parseCookies } from "nookies";
const cookies = parseCookies();

const token = typeof window !== "undefined" ? cookies.access_token : null;

export const api = axios.create({
  baseURL: "https://passwordremember-production.up.railway.app/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});
