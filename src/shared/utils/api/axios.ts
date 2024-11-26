import axios from "axios";

export const axiosMaps = axios.create({
  baseURL: "https://maps.googleapis.com/",
});
