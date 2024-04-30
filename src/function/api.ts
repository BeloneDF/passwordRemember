import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("acess_token"),
    Accept: "*/*",
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
  },
});

const cancelToken = axios.CancelToken.source();

export default {
  api,
  cancelToken,
};
